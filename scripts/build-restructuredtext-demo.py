"""Generate the RST Base guide from the preserved public-domain Docutils demo."""
from pathlib import Path
import hashlib
import json
import re
import shutil

ROOT = Path(__file__).resolve().parents[1] / 'packages/restructuredtext'
SOURCE = ROOT / 'source/demo.rst'
DOCS = ROOT / 'public/docs'
EXAMPLES = DOCS / 'demo-examples'
EXAMPLES.mkdir(parents=True, exist_ok=True)
shutil.copytree(ROOT / 'source/images', EXAMPLES / 'images', dirs_exist_ok=True)
source = SOURCE.read_text()
start = source.index('Structural Elements\n===================')
sections = list(re.finditer(r'^([^\n]+)\n(={3,}|-{3,}|`{3,})\n', source[start:], re.M))
parts = []
for i, match in enumerate(sections):
    end = sections[i+1].start() if i+1 < len(sections) else len(source[start:])
    parts.append((match[1], match[2][0], source[start:][match.end():end].strip()))
by_title = {title: body for title, _, body in parts}
footnotes = by_title['Footnotes'].split('.. [4]')[0].strip()
citation = by_title['Citations'].split("Here's a reference")[0].strip()

intro = '''Base: reStructuredText Demonstration
====================================

**tp-restructuredtext** adapts `Docutils <https://docutils.sourceforge.io/>`_ for the web through Pyodide, with support for TP components and standard HTML elements. This page covers reStructuredText syntax. Continue with `Interpreted Text Roles <roles.rst>`_ for the native role reference; component syntax is described separately in `Extensions <extensions.rst>`_.

.. tp-callout::
   :variant: info
   :heading: About this adaptation

   This guide adapts David Goodger's `Demonstration of most reStructuredText features <https://docutils.sourceforge.io/docs/user/rst/demo.html>`_ and its `RST source <https://docutils.sourceforge.io/docs/user/rst/demo.rst>`_. The original document explicitly places itself in the public domain. The preserved source has revision 10266, dated 2025-11-28; it is retained with its copyright statement in this repository.

   Examples use `tp-restructuredtext-viewer <https://tp-web-lab.github.io/tp-components/#/components/restructuredtext-viewer/index.md>`_ from ``@tp/tp-components`` in lite mode. Edit their RST source directly to experiment and see the result.

   The demonstration has been divided into self-contained examples. Referenced targets, notes and substitutions are supplied locally, and the original images are bundled. Python prompts use Python 3 syntax. Short original TP texts replace the quoted song and comedy extracts. Intentional errors are grouped in the final example instead of appearing throughout the guide. TP styling and fragment rendering may differ from the standalone Docutils page; metadata is not promoted to the surrounding page's head.

.. tp-toc::
   :expand-all:
   :position: end

'''
page = [intro]
manifest = []

def example(title, code, note='', expected_errors=False):
    slug = re.sub('[^a-z0-9]+', '-', title.lower()).strip('-')
    (EXAMPLES / f'{slug}.rst').write_text(code.strip()+'\n')
    number = len(manifest)+1
    manifest.append({'number': number, 'title': title, 'file': f'{slug}.rst', 'expectedErrors': expected_errors})
    page.append(f'**Example {number}. {title}**\n\n')
    if note: page.append(note+'\n\n')
    page.append(f'.. tp-restructuredtext-viewer::\n   :lite:\n   :src: docs/demo-examples/{slug}.rst\n\n')

page.append('Document title and bibliographic fields\n---------------------------------------\n\n')
header = source[:start].replace('.. contents:: Table of Contents\n.. section-numbering::', '')
example('Document title and bibliographic fields', header,
        'The title, subtitle, author fields, dedication and abstract belong to the example document, not to this guide.')
for title, mark, code in parts:
    if title in ('Duplicate Target Names', 'Error Handling'): continue
    level = {'=':'-', '-':'~', '`':'^'}[mark]
    page.append(title+'\n'+level*len(title)+'\n\n')
    if not code: continue
    note = ''
    if title == 'Section Title': code = 'Section Title\n=============\n\n'+code
    if title == 'Inline Markup':
        code = re.sub(r'  Problems are indicated by\n\|problematic\| text.*?intentional\)\.', '', code, flags=re.S)
        code += '\n\n.. _Python: https://www.python.org\n\n.. _example:\n\nThis is the local example target.\n\n.. _Targets:\n\nA target for the reference above.\n\n.. |example| image:: images/biohazard.png\n   :alt: Example symbol\n\n'+footnotes+'\n\n'+citation
        note = 'This isolated example supplies its own target, substitution, citation and footnote definitions. The intentionally undefined substitution from the original is shown under Error handling.'
    elif title == 'Line Blocks':
        code = code.split('Take it away, Eric')[0] + '''An indented line block:

    | Read the source,
    |     change a line,
    | and watch the result.
'''
    elif title == 'Block Quotes':
        code = '''Block quotes consist of indented body elements:

    A small example is often the best starting point.
    Change one detail, then inspect the result.

    -- TP documentation
'''
    elif title == 'Doctest Blocks':
        code = '''>>> print('Python-specific usage examples; begun with ">>>"')
Python-specific usage examples; begun with ">>>"
>>> 2 + 3
5
'''
        note = 'These prompts are rendered as documentation. They are not executed by this lite viewer; the optional TP doctest feature is described in Extensions.'
    elif title == 'Footnotes':
        code = 'Manual [1]_, named [#label]_, anonymous [#]_ and symbolic [*]_ notes.\n\n'+footnotes
        note = 'References and definitions are in the same example. The deliberately missing note from the original is reserved for Error handling.'
    elif title == 'Citations': code = citation+"\n\nHere's a reference to the above, [CIT2002]_."
    elif title == 'Targets':
        code = '''Targets
=======

.. _example:

This paragraph has an explicit target. Follow example_ or the `Inline Markup`_ heading.

Inline Markup
-------------

Here is an _`inline hyperlink target`. Return to `inline hyperlink target`_ or Targets_.

Explicit external targets resolve references such as Python_.

.. _Python: https://www.python.org

An anonymous `link to the section`__ can refer to Targets_ too.

__ Targets_
'''
        note = 'All internal destinations live in this example. Duplicate and missing targets are demonstrated in Error handling.'
    elif title == 'Directives':
        page.append('Directives introduce specialized content. The examples below cover the directives used in the original demonstration. See the `complete directive reference <https://docutils.sourceforge.io/docs/ref/rst/directives.html>`_.\n\n')
        continue
    elif title == 'Document Parts':
        code = '''A small document
================

.. contents:: Table of contents
.. section-numbering::

First section
-------------

Choose a section in the table of contents.

Second section
--------------

.. contents:: In this section
   :local:

A subsection
~~~~~~~~~~~~

The local table lists only the subsections of its own section.
'''
        note = 'Contents and numbering operate on each isolated document. The guide itself uses tp-toc.'
    elif title == 'Images':
        code = code.replace(':target: directives_', ':target: https://docutils.sourceforge.io/docs/ref/rst/directives.html')
        code = code.replace('.. image:: images/title.png\n', '.. image:: images/title.png\n   :alt: reStructuredText\n')
    elif title == 'Target Footnotes': code = 'Visit `Python <https://www.python.org>`_ and `Docutils <https://docutils.sourceforge.io/>`_.\n\n'+code
    elif title == 'Replacement Text': code += '\n\n.. _Python: https://www.python.org'
    elif title == 'Meta': note = 'The meta directive describes document metadata. The TP renderer returns a body fragment, so these tags do not update the browser tab title or the parent document head. The visible result is the explanatory paragraph.'
    elif title == 'Substitution Definitions': code = code.replace('(Substitution definitions are not visible in the HTML source.)','The definition is replaced by the image at each reference; its RST syntax is not displayed.')
    example(title, code, note)

page.append('Error handling\n--------------\n\n')
example('Intentional diagnostics', '''Error handling
==============

An undefined substitution: |problematic|.

A missing footnote: [5]_.

A missing citation: [nonexistent]_.

A `hyperlink reference without a target`_.

Duplicate Target Names
----------------------

First section with this title.

Duplicate Target Names
----------------------

An ambiguous reference: `Duplicate Target Names`_.

|*** Expect a diagnostic for this undefined substitution too. ***|
''', 'This example intentionally contains six errors inherited from the demonstration. Docutils reports missing substitutions, notes, citations and targets, including an ambiguous duplicate heading. These messages are the expected result, not failures of the other examples. Duplicate headings may also produce informational diagnostics depending on the Docutils settings.', True)
page.append('For the complete language description, see the `reStructuredText reference <https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html>`_ and `directive reference <https://docutils.sourceforge.io/docs/ref/rst/directives.html>`_. Continue with `Extensions <extensions.rst>`_ for TP components and HTML elements.\n')
(DOCS / 'base.rst').write_text(''.join(page))
(EXAMPLES / 'manifest.json').write_text(json.dumps(manifest, indent=2)+'\n')
print(f'Generated {len(manifest)} RST examples; source SHA-256 {hashlib.sha256(SOURCE.read_bytes()).hexdigest()}')
