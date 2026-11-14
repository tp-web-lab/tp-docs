Base: reStructuredText Demonstration
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

Document title and bibliographic fields
---------------------------------------

**Example 1. Document title and bibliographic fields**

The title, subtitle, author fields, dedication and abstract belong to the example document, not to this guide.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/document-title-and-bibliographic-fields.rst

Structural Elements
-------------------

Section Title
~~~~~~~~~~~~~

**Example 2. Section Title**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/section-title.rst

Transitions
~~~~~~~~~~~

**Example 3. Transitions**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/transitions.rst

Body Elements
-------------

Paragraphs
~~~~~~~~~~

**Example 4. Paragraphs**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/paragraphs.rst

Inline Markup
^^^^^^^^^^^^^

**Example 5. Inline Markup**

This isolated example supplies its own target, substitution, citation and footnote definitions. The intentionally undefined substitution from the original is shown under Error handling.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/inline-markup.rst

Bullet Lists
~~~~~~~~~~~~

**Example 6. Bullet Lists**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/bullet-lists.rst

Enumerated Lists
~~~~~~~~~~~~~~~~

**Example 7. Enumerated Lists**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/enumerated-lists.rst

Definition Lists
~~~~~~~~~~~~~~~~

**Example 8. Definition Lists**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/definition-lists.rst

Field Lists
~~~~~~~~~~~

**Example 9. Field Lists**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/field-lists.rst

Option Lists
~~~~~~~~~~~~

**Example 10. Option Lists**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/option-lists.rst

Literal Blocks
~~~~~~~~~~~~~~

**Example 11. Literal Blocks**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/literal-blocks.rst

Line Blocks
~~~~~~~~~~~

**Example 12. Line Blocks**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/line-blocks.rst

Block Quotes
~~~~~~~~~~~~

**Example 13. Block Quotes**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/block-quotes.rst

Doctest Blocks
~~~~~~~~~~~~~~

**Example 14. Doctest Blocks**

These prompts are rendered as documentation. They are not executed by this lite viewer; the optional TP doctest feature is described in Extensions.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/doctest-blocks.rst

Tables
~~~~~~

**Example 15. Tables**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/tables.rst

Footnotes
~~~~~~~~~

**Example 16. Footnotes**

References and definitions are in the same example. The deliberately missing note from the original is reserved for Error handling.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/footnotes.rst

Citations
~~~~~~~~~

**Example 17. Citations**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/citations.rst

Targets
~~~~~~~

**Example 18. Targets**

All internal destinations live in this example. Duplicate and missing targets are demonstrated in Error handling.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/targets.rst

Directives
~~~~~~~~~~

Directives introduce specialized content. The examples below cover the directives used in the original demonstration. See the `complete directive reference <https://docutils.sourceforge.io/docs/ref/rst/directives.html>`_.

Document Parts
^^^^^^^^^^^^^^

**Example 19. Document Parts**

Contents and numbering operate on each isolated document. The guide itself uses tp-toc.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/document-parts.rst

Images
^^^^^^

**Example 20. Images**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/images.rst

Admonitions
^^^^^^^^^^^

**Example 21. Admonitions**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/admonitions.rst

Topics, Sidebars, and Rubrics
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

**Example 22. Topics, Sidebars, and Rubrics**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/topics-sidebars-and-rubrics.rst

Target Footnotes
^^^^^^^^^^^^^^^^

**Example 23. Target Footnotes**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/target-footnotes.rst

Replacement Text
^^^^^^^^^^^^^^^^

**Example 24. Replacement Text**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/replacement-text.rst

Compound Paragraph
^^^^^^^^^^^^^^^^^^

**Example 25. Compound Paragraph**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/compound-paragraph.rst

Meta
^^^^

**Example 26. Meta**

The meta directive describes document metadata. The TP renderer returns a body fragment, so these tags do not update the browser tab title or the parent document head. The visible result is the explanatory paragraph.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/meta.rst

Substitution Definitions
~~~~~~~~~~~~~~~~~~~~~~~~

**Example 27. Substitution Definitions**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/substitution-definitions.rst

Comments
~~~~~~~~

**Example 28. Comments**

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/comments.rst

Error handling
--------------

**Example 29. Intentional diagnostics**

This example intentionally contains six errors inherited from the demonstration. Docutils reports missing substitutions, notes, citations and targets, including an ambiguous duplicate heading. These messages are the expected result, not failures of the other examples. Duplicate headings may also produce informational diagnostics depending on the Docutils settings.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/demo-examples/intentional-diagnostics.rst

For the complete language description, see the `reStructuredText reference <https://docutils.sourceforge.io/docs/ref/rst/restructuredtext.html>`_ and `directive reference <https://docutils.sourceforge.io/docs/ref/rst/directives.html>`_. Continue with `Extensions <extensions.rst>`_ for TP components and HTML elements.
