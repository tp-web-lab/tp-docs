"""Adapt the public-domain Docutils roles reference with executable RST samples."""
from pathlib import Path
from urllib.parse import urljoin
import json
import re

ROOT = Path(__file__).resolve().parents[1] / 'packages/restructuredtext'
DOCS = ROOT / 'public/docs'
EXAMPLES = DOCS / 'roles-examples'
EXAMPLES.mkdir(parents=True, exist_ok=True)
source = (ROOT / 'source/roles.rst').read_text().replace('.. include:: ../../header2.rst\n\n','',1)
intro = '''.. tp-callout::
   :variant: info
   :heading: About this reference

   This page adapts David Goodger's public-domain `reStructuredText Interpreted Text Roles <https://docutils.sourceforge.io/docs/ref/rst/roles.html>`_ and its `RST source <https://docutils.sourceforge.io/docs/ref/rst/roles.rst>`_, revision 10287 dated 2026-01-07. The original RST is preserved in this repository.

   Executable snippets use `tp-restructuredtext-viewer <https://tp-web-lab.github.io/tp-components/#/components/restructuredtext-viewer/index.md>`_ in lite mode: edit the source to experiment. Isolated examples supply their own role and citation definitions; documentation links point to Docutils. The pseudo-XML fragment remains a literal illustration. TP uses body fragments and its own rendering styles, so the appearance can differ from the official reference. Explicit language options are supplied for compatibility with the Docutils version loaded by Pyodide.

   Start with the `Demonstration <base.rst>`_ for general syntax. See `Extensions <extensions.rst>`_ for TP custom-element roles, which are separate from these native Docutils roles.

'''
source=source.replace('Interpreted text uses backquotes',intro+'Interpreted text uses backquotes',1)
source=source.replace('.. contents::','.. tp-toc::\n   :expand-all:\n   :position: end',1)
# Resolve official reference targets, including the continuation-line target.
lines=source.splitlines()
for i,line in enumerate(lines):
    match=re.match(r'^(\s*(?:\.\. _.*?:|__)\s+)(\S+)\s*$',line)
    if match and re.match(r'(?:\.\.?/|[\w-]+\.html)',match[2]):
        lines[i]=match[1]+urljoin('https://docutils.sourceforge.io/docs/ref/rst/roles.rst',match[2])
    elif line.strip()=='../../howto/rst-roles.html':
        lines[i]='    https://docutils.sourceforge.io/docs/howto/rst-roles.html'
source='\n'.join(lines)+'\n'
manifest=[]
def viewer(code, label, indent=''):
    n=len(manifest)+1
    name=f'example-{n:02d}.rst'
    (EXAMPLES/name).write_text(code.rstrip()+'\n')
    manifest.append({'number':n,'title':label,'file':name})
    return f'{indent}**Example {n}. {label}**\n\n{indent}.. tp-restructuredtext-viewer::\n{indent}   :lite:\n{indent}   :src: docs/roles-examples/{name}\n'

# Convert literal RST samples into viewers, preserving nesting within tips.
lines=source.splitlines(); output=[]; i=0; section='Role syntax'
while i<len(lines):
    line=lines[i]
    if re.fullmatch(r':[a-z-]+:',line): section=line
    if line.rstrip().endswith('::') and not line.lstrip().startswith('.. '):
        j=i+1
        while j<len(lines) and not lines[j].strip(): j+=1
        parent=len(line)-len(line.lstrip())
        if j<len(lines) and len(lines[j])-len(lines[j].lstrip())>parent:
            depth=len(lines[j])-len(lines[j].lstrip()); k=j
            while k<len(lines) and (not lines[k].strip() or len(lines[k])-len(lines[k].lstrip())>=depth): k+=1
            code='\n'.join(x[depth:] if x.strip() else '' for x in lines[j:k]).strip()
            if code.startswith('<paragraph>'):
                output.extend(lines[i:k]); i=k; continue
            if code.startswith('.. role:: tex(code)'):
                code='.. role:: tex(code)\n   :language: latex\n\nA formula in source form: :tex:`x^2 + y^2`. '
            elif code.startswith('.. role:: js(code)'):
                code+='\n\nJavaScript source: :js:`const answer = 42;`.'
            elif code.startswith('.. role:: raw-html(raw)'):
                code+='\n\nA native raw role: :raw-html:`<mark>Highlighted text</mark>`.'
            elif ':raw-html:' in code:
                code='.. role:: raw-html(raw)\n   :format: html\n\n'+code
            if '[GoF95]_' in code:
                code+='\n\n.. [GoF95] Gamma, Helm, Johnson and Vlissides. Design Patterns. 1995.'
            output.append(line.rstrip()[:-1]); output.append('')
            output.extend(viewer(code,section,' '*parent).rstrip().splitlines()); output.append('')
            i=k; continue
    output.append(line);i+=1
source='\n'.join(output)+'\n'
# Supply executable samples for roles that have no source snippet upstream.
extra={
 ':abbreviation:':':abbreviation:`St` is short for Street; :ab:`Ave` is short for Avenue.',
 ':acronym:':':acronym:`HTML` and its alias :ac:`CSS`.',
 ':code:':':code:`print("Hello")` marks text as code.',
 ':superscript:':r'E = mc\ :sup:`2`. A longer role name: x\ :superscript:`3`.',
 ':title-reference:':':title-reference:`Design Patterns`, :title:`The Python Tutorial`, and :t:`A Book`.',
}
for title,code in extra.items():
    header='-'*len(title)+'\n'+title+'\n'+'-'*len(title)+'\n'
    assert header in source,title
    source=source.replace(header,header+'\n'+viewer(code,title)+'\n',1)
# Renumber in reading order, including the examples inserted above.
lookup={entry['file']:entry for entry in manifest}; ordered=[]
for m in re.finditer(r'(?m)^(\s*)\*\*Example \d+\. ([^\n]+)\*\*\n\n\s*\.\. tp-restructuredtext-viewer::\n\s*:lite:\n\s*:src: docs/roles-examples/(example-\d+\.rst)',source):
    ordered.append(lookup[m[3]])
n=[0]
def renumber(m):
    n[0]+=1; return f'{m[1]}**Example {n[0]}. '
source=re.sub(r'(?m)^(\s*)\*\*Example \d+\. ',renumber,source)
# Explain TP-specific limits next to the native-role reference.
source += '''
TP rendering notes
==================

The native ``code`` role retains its semantics and language options. TP's parser disables Docutils/Pygments highlighting by default; declaring a language does not by itself guarantee colored inline code in this viewer. The ``math`` role is displayed through TP's MathJax integration.

The standard definition files are not automatically included in browser documents. TP disables filesystem includes by default. Define the roles you need in the document, or use TP's direct HTML roles as described in Extensions. The following example needs no external definition file.

'''
source+=viewer('''.. role:: highlighted
   :class: underline

A custom CSS role: :highlighted:`underlined text`.

.. default-role:: emphasis

This uses the changed default role: `important text`.

.. default-role::

The native default is restored: `A Book`.
''','Custom roles and the default role')
source+='\nFor further details, see the `complete Docutils role reference <https://docutils.sourceforge.io/docs/ref/rst/roles.html>`_ and the `role directive <https://docutils.sourceforge.io/docs/ref/rst/directives.html#role>`_.\n'
(DOCS/'roles.rst').write_text(source)
for index, entry in enumerate(ordered+[manifest[-1]], 1):
    entry['number'] = index
(EXAMPLES/'manifest.json').write_text(json.dumps(ordered+[manifest[-1]],indent=2)+'\n')
print(f'Generated roles reference with {len(manifest)} editable examples.')
