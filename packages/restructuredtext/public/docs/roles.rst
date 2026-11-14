=========================================
 reStructuredText Interpreted Text Roles
=========================================

:Author: David Goodger
:Contact: docutils-develop@lists.sourceforge.net
:Revision: $Revision: 10287 $
:Date: $Date: 2026-01-07 14:40:59 +0100 (Mi, 07. Jan 2026) $
:Copyright: This document has been placed in the public domain.
:Abstract:
  This document describes the interpreted text roles implemented in the
  reference reStructuredText parser.

.. tp-callout::
   :variant: info
   :heading: About this reference

   This page adapts David Goodger's public-domain `reStructuredText Interpreted Text Roles <https://docutils.sourceforge.io/docs/ref/rst/roles.html>`_ and its `RST source <https://docutils.sourceforge.io/docs/ref/rst/roles.rst>`_, revision 10287 dated 2026-01-07. The original RST is preserved in this repository.

   Executable snippets use `tp-restructuredtext-viewer <https://tp-web-lab.github.io/tp-components/#/components/restructuredtext-viewer/index.md>`_ in lite mode: edit the source to experiment. Isolated examples supply their own role and citation definitions; documentation links point to Docutils. The pseudo-XML fragment remains a literal illustration. TP uses body fragments and its own rendering styles, so the appearance can differ from the official reference. Explicit language options are supplied for compatibility with the Docutils version loaded by Pyodide.

   Start with the `Demonstration <base.rst>`_ for general syntax. See `Extensions <extensions.rst>`_ for TP custom-element roles, which are separate from these native Docutils roles.

Interpreted text uses backquotes (`) around the text.  An explicit
role marker may optionally appear before or after the text, delimited
with colons.  For example:

**Example 1. Role syntax**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-01.rst

A "default role" may be defined by applications of reStructuredText; it
is used if no explicit ``:role:`` prefix or suffix is given.  The
default "default role" is "`:title-reference:`_".  It can be changed
using the `"default-role" directive`_.

See the `Interpreted Text`_ section in the `reStructuredText Markup
Specification`_ for syntax details.  For details on the hierarchy of
elements, please see `The Docutils Document Tree`_ and the `Docutils
Generic DTD`_ XML document type definition.  For interpreted text role
implementation details, see `Creating reStructuredText Interpreted
Text Roles`_.


.. tp-toc::
   :expand-all:
   :position: end


Standard Roles
==============


--------------
:abbreviation:
--------------

**Example 2. :abbreviation:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-18.rst


.. class:: field-indent-12em

:Aliases:         \:ab:
:Doctree Element: `\<abbreviation>`_

An abbreviation used in the document.
An example of an abbreviation is ‘St’ being used instead of ‘Street’.


---------
:acronym:
---------

**Example 3. :acronym:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-19.rst


.. class:: field-indent-12em

:Aliases:         \:ac:
:Doctree Element: `\<acronym>`_

An acronym.


------
:code:
------

**Example 4. :code:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-20.rst


.. class:: field-indent-12em

:Aliases:         None
:Doctree Element: `\<literal>`_
:Customization_ options: `class <"class" option_>`__,
                         `language <"language" option_>`__

The :code: role marks its content as code in a formal language.

For syntax highlight of inline code, the `"role" directive`_ can be
used to create `custom roles`_.  For example, the following creates
a role "tex" to mark up and highlight LaTeX examples:

**Example 5. :code:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-02.rst

A different `highlight language`_ can be specified in the
`"language" option`_:

**Example 6. :code:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-03.rst

Content of the new role is parsed and tagged by the Pygments_ syntax
highlighter.  See the `"code" directive`_ for more info on syntax highlight
in Docutils.

New in Docutils 0.9.  Since Docutils 0.23, the highlight language of
derived roles defaults to the role name.

.. _customization: `custom roles`_
.. _Pygments: https://pygments.org/
.. _highlight language: https://pygments.org/languages/


----------
:emphasis:
----------

.. class:: field-indent-12em

:Aliases:         None
:Doctree Element: `\<emphasis>`_

Implements emphasis.  These are equivalent:

**Example 7. :emphasis:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-04.rst

---------
:literal:
---------

.. class:: field-indent-12em

:Aliases:         None
:Doctree Element: `\<literal>`_

Implements inline literal text.  These are equivalent:

**Example 8. :literal:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-05.rst

Care must be taken with backslash-escapes though.  These are *not*
equivalent:

**Example 9. :literal:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-06.rst

The backslashes in the first line are preserved (and do nothing),
whereas the backslashes in the second line escape the following
spaces.


------
:math:
------

.. class:: field-indent-12em

:Aliases:         None
:Doctree Element: `\<math>`_

(New in Docutils 0.8.)

The ``math`` role marks its content as mathematical notation (inline
formula).

The input format is LaTeX math syntax without the “math delimiters“
(``$ $``), for example:

**Example 10. :math:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-07.rst

See the `"math" directive`_ (producing display formulas) for more info
on mathematical notation in reStructuredText.


---------------
:pep-reference:
---------------

.. class:: field-indent-12em

:Aliases:         \:PEP:
:Doctree Element: `\<reference>`_

The :pep-reference: role is used to create an HTTP reference to a
PEP (Python Enhancement Proposal).  The :PEP: alias is usually
used.  The content must be a number, for example:

**Example 11. :pep-reference:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-08.rst

This is equivalent to:

**Example 12. :pep-reference:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-09.rst

---------------
:rfc-reference:
---------------

.. class:: field-indent-12em

:Aliases:         \:RFC:
:Doctree Element: `\<reference>`_

The :rfc-reference: role is used to create an HTTP reference to an
RFC (Internet Request for Comments).  The :RFC: alias is usually
used.  The content must be a number [#]_, for example:

**Example 13. :rfc-reference:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-10.rst

This is equivalent to:

**Example 14. :rfc-reference:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-11.rst

.. [#] You can link to a specific section by saying
   ``:rfc:`number#anchor```. (New in Docutils 0.15.)

   .. Warning:: The anchor (anything following a ``#``) is appended to
      the reference without any checks and not shown in the link text.

      It is recommended to use `hyperlink references`_ for
      anything more complex than a single RFC number.


--------
:strong:
--------

.. class:: field-indent-12em

:Aliases:         None
:Doctree Element: `\<strong>`_

Implements strong emphasis.  These are equivalent:

**Example 15. :strong:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-12.rst

-----------
:subscript:
-----------

.. class:: field-indent-12em

:Aliases:         \:sub:
:Doctree Element: `\<subscript>`_

Implements subscripts.

.. Tip::

   Whitespace or punctuation is required around interpreted text, but
   often not desired with subscripts & superscripts.
   Backslash-escaped whitespace can be used; the whitespace will be
   removed from the processed document:

   **Example 16. :subscript:**

   .. tp-restructuredtext-viewer::
      :lite:
      :src: docs/roles-examples/example-13.rst

   In such cases, readability of the plain text can be greatly
   improved with substitutions [#]_:

   **Example 17. :subscript:**

   .. tp-restructuredtext-viewer::
      :lite:
      :src: docs/roles-examples/example-14.rst

   See `the reStructuredText spec`__ for further information on
   `character-level markup`__ and `the substitution mechanism`__.

   .. [#] Alternatives are the `:math:`_ role (:math:`E=mc^2`)
      or literal Unicode characters (H₂O)

   __ https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html
   __ https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#character-level-inline-markup-1
   __ https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#substitution-references


-------------
:superscript:
-------------

**Example 18. :superscript:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-21.rst


.. class:: field-indent-12em

:Aliases:         \:sup:
:Doctree Element: `\<superscript>`_

Implements superscripts.  See the tip in `:subscript:`_ above.


-----------------
:title-reference:
-----------------

**Example 19. :title-reference:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-22.rst


.. class:: field-indent-12em

:Aliases:         \:title:, :t:
:Doctree Element: `\<title_reference>`_

The :title-reference: role is used to describe the titles of
books, periodicals, and other materials.  It is the equivalent of the
HTML "cite" element, and it is expected that HTML writers will
typically render "title_reference" elements using "cite".

Since title references are typically rendered with italics, they are
often marked up using ``*emphasis*``, which is misleading and vague.
The "title_reference" element provides accurate and unambiguous
descriptive markup.

Let's assume :title-reference: is the default interpreted text
role (see below) for this example:

**Example 20. :title-reference:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-15.rst

The following document fragment (pseudo-XML_) will result from
processing::

    <paragraph>
        <title_reference>
            Design Patterns

        <citation_reference refname="gof95">
            GoF95
         is an excellent read.

`:title-reference:`_ is the default interpreted text role in the
standard reStructuredText parser.  This means that no explicit role is
required.  Applications of reStructuredText may designate a different
default role, in which case the explicit :title-reference: role
must be used to obtain a ``title_reference`` element.


Specialized Roles
=================

-----
:raw:
-----

.. class:: field-indent-12em

:Aliases:         None
:Doctree Element: `\<raw>`_
:Customization_ options: `class <"class" option_>`__,
                         `format <"format" option_>`__

The "raw" role indicates non-reStructuredText data that is to be
passed untouched to the Writer.  It is the inline equivalent of the
`"raw" directive`_; see its documentation for details on the
semantics.

**The "raw" role cannot be used directly.**  The `"role" directive`_ must
first be used to create `custom roles`_ based on the "raw" role.  One or
more formats (Writer names) must be provided in a `"format" option`_.

.. WARNING::
   The "raw" role is a stop-gap measure allowing the author to bypass
   reStructuredText's markup.  It is a "power-user" feature that
   should not be overused or abused.  The use of "raw" ties documents
   to specific output formats and makes them less portable.

   If you often need to use "raw"-derived interpreted text roles or
   the "raw" directive, that is a sign either of overuse/abuse or that
   functionality may be missing from reStructuredText.  Please
   describe your situation in a message to the Docutils-users_ mailing
   list.

   .. _Docutils-users: https://docutils.sourceforge.io/docs/user/mailing-lists.html#docutils-user

For example, the following creates an HTML-specific "raw-html" role:

**Example 21. :raw:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-16.rst

This role can now be used directly to pass data untouched to the HTML
Writer.  For example:

**Example 22. :raw:**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-17.rst

.. Tip:: Roles based on "raw" should clearly indicate their origin, so
   they are not mistaken for reStructuredText markup.  Using a "raw-"
   prefix for role names is recommended.


Roles Defined in Standard Definition Files
==========================================

The `reStructuredText Standard Definition Files`_ ``html-roles.txt`` and
``s5defs.txt`` define additional roles for `semantic inline markup`_
and for use in `S5/HTML slide shows`_ (colors, font sizes, display options).


Custom Roles
============

Custom interpreted text roles can be defined in a document with the
`"role" directive`_. The new role may be based on an existing role.
The "role" directive may be called with options_ to customize the
generated roles.


.. References

.. _reStructuredText Markup Specification: https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html
.. _Interpreted Text: https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#interpreted-text
.. _hyperlink references: https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html#hyperlink-references

.. _reStructuredText Standard Definition Files: https://docutils.sourceforge.io/docs/ref/rst/definitions.html
.. _semantic inline markup: https://docutils.sourceforge.io/docs/ref/rst/definitions.html#additional-roles-for-html
.. _S5/HTML slide shows: https://docutils.sourceforge.io/docs/ref/rst/definitions.html#s5-html-definitions

.. _The Docutils Document Tree: https://docutils.sourceforge.io/docs/ref/doctree.html
.. _class names: https://docutils.sourceforge.io/docs/ref/doctree.html#classname
.. _classes attribute: https://docutils.sourceforge.io/docs/ref/doctree.html#classes
.. _format attribute: https://docutils.sourceforge.io/docs/ref/doctree.html#format
.. _pseudo-XML: https://docutils.sourceforge.io/docs/ref/doctree.html#pseudo-xml

.. _Docutils Generic DTD: https://docutils.sourceforge.io/docs/ref/docutils.dtd
.. _Creating reStructuredText Interpreted Text Roles:
    https://docutils.sourceforge.io/docs/howto/rst-roles.html
.. _writer names: https://docutils.sourceforge.io/docs/user/config.html#writer-docutils-application

.. _"class" directive:        https://docutils.sourceforge.io/docs/ref/rst/directives.html#role-class
.. _"code" directive:         https://docutils.sourceforge.io/docs/ref/rst/directives.html#code
.. _"default-role" directive: https://docutils.sourceforge.io/docs/ref/rst/directives.html#default-role
.. _"role" directive:         https://docutils.sourceforge.io/docs/ref/rst/directives.html#role
.. _"math" directive:         https://docutils.sourceforge.io/docs/ref/rst/directives.html#math
.. _"raw" directive:          https://docutils.sourceforge.io/docs/ref/rst/directives.html#raw
.. _options:                  https://docutils.sourceforge.io/docs/ref/rst/directives.html#role-options
.. _"class" option:           https://docutils.sourceforge.io/docs/ref/rst/directives.html#role-directive-class-option
.. _"format" option:          https://docutils.sourceforge.io/docs/ref/rst/directives.html#format
.. _"language" option:        https://docutils.sourceforge.io/docs/ref/rst/directives.html#language

.. _<abbreviation>:    https://docutils.sourceforge.io/docs/ref/doctree.html#abbreviation
.. _<acronym>:         https://docutils.sourceforge.io/docs/ref/doctree.html#acronym
.. _<emphasis>:        https://docutils.sourceforge.io/docs/ref/doctree.html#emphasis
.. _<literal>:         https://docutils.sourceforge.io/docs/ref/doctree.html#literal
.. _<math>:            https://docutils.sourceforge.io/docs/ref/doctree.html#math
.. _<reference>:       https://docutils.sourceforge.io/docs/ref/doctree.html#reference
.. _<raw>:             https://docutils.sourceforge.io/docs/ref/doctree.html#raw
.. _<strong>:          https://docutils.sourceforge.io/docs/ref/doctree.html#strong
.. _<subscript>:       https://docutils.sourceforge.io/docs/ref/doctree.html#subscript
.. _<superscript>:     https://docutils.sourceforge.io/docs/ref/doctree.html#superscript
.. _<title_reference>: https://docutils.sourceforge.io/docs/ref/doctree.html#title-reference

TP rendering notes
==================

The native ``code`` role retains its semantics and language options. TP's parser disables Docutils/Pygments highlighting by default; declaring a language does not by itself guarantee colored inline code in this viewer. The ``math`` role is displayed through TP's MathJax integration.

The standard definition files are not automatically included in browser documents. TP disables filesystem includes by default. Define the roles you need in the document, or use TP's direct HTML roles as described in Extensions. The following example needs no external definition file.

**Example 23. Custom roles and the default role**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/roles-examples/example-23.rst

For further details, see the `complete Docutils role reference <https://docutils.sourceforge.io/docs/ref/rst/roles.html>`_ and the `role directive <https://docutils.sourceforge.io/docs/ref/rst/directives.html#role>`_.
