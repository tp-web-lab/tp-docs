Extensions
==========

**tp-restructuredtext** extends Docutils with direct directives and interpreted-text roles for HTML custom elements, including TP components. These extensions are enabled by default and do not require HTML passthroughs.

.. tp-callout::
   :variant: info
   :heading: Experiment with the examples

   The examples use `tp-restructuredtext-viewer <https://tp-web-lab.github.io/tp-components/#/components/restructuredtext-viewer/index.md>`_ in lite mode. Modify the source to experiment. For the native language, see the `Demonstration <base.rst>`_ and `Interpreted Text Roles <roles.rst>`_.

.. tp-toc::
   :expand-all:
   :position: end

Block elements
--------------

Write a directive named after the element, such as ``.. tp-callout::``. Indent its options and content consistently (three spaces in these examples). Leave a blank line between the options and the body. Content is parsed as RST, including emphasis, lists and nested components.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/block.rst


Inline elements
---------------

Use an interpreted-text role such as ``:tp-badge:`Ready``` inside a paragraph. To configure attributes, define a named role derived from the component using ``.. role:: success-badge(tp-badge)`` and place its options below the definition. A custom role name must be defined in the same example document that uses it.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/inline.rst


Inline component content is plain text, escaped for HTML; it is not recursively parsed as RST. Use the block form when the content needs lists, formatting or nested elements.

Attributes, identifiers and classes
-----------------------------------

Each ``:name: value`` option becomes an HTML attribute. Use ``:id:`` for an identifier and ``:class:`` for CSS classes. Values do not need quotes, including values with spaces. An empty option such as ``:disabled:`` becomes a boolean attribute; omit it to disable the flag. ``:disabled: false`` still adds the HTML boolean attribute and does not enable the button. Available attributes depend on the component.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/attributes.rst


Nested elements
---------------

RST uses indentation, not delimiter lengths, to express nesting. The following example nests three TP elements. Each inner directive is indented within its parent; dedenting returns to the parent level. Keep a blank line before a nested directive and before returning to an outer level.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/nested.rst


Elements without content
------------------------

An empty directive can consist of its element name and options alone. If a component supports inline placement, such as ``tp-icon``, a configured role is also possible. RST inline roles require text between backticks; in the inline example, ``TP`` is supplied as content, while the icon's appearance is selected by its ``name`` attribute. Use the empty block form when the element must have no content.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/empty.rst


Standard HTML and CSS roles
---------------------------

Standard HTML elements such as ``section``, ``div`` and ``mark`` use the same syntax. Native Docutils directives and roles keep their established meaning when names overlap: for example, ``figure``, ``table``, ``meta``, ``code`` and ``title-reference`` are not redefined as generic HTML elements. Use the standard directive for these structures.

A role defined without a component base adds CSS classes to inline text. It does not register a custom element; its appearance depends on the page's styles.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/html.rst


Loading another component library
---------------------------------

The syntax creates an HTML element, but the element's JavaScript implementation must also be loaded. TP's documentation and viewers load TP components automatically. In your own page, use the TP autoloader or import individual modules. For another library, load its module and any required styles in the document containing the element.

Shoelace
~~~~~~~~

This example imports only the `Shoelace button <https://shoelace.style/components/button>`_ and its light theme. The ``link`` directive creates the stylesheet link. The ``script`` directive preserves the module source as JavaScript, without parsing it as RST.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/shoelace.rst


Change ``:variant: primary`` to ``:variant: success``, or add an empty ``:disabled:`` option to the button.

React: mount a library component in a container
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

React and Vue components are not automatically custom elements. Loading their module and declaring an RST element does not mount an application; TP does not compile JSX or Vue files. This example mounts the ``HexColorPicker`` from `react-colorful <https://github.com/omgovich/react-colorful>`_ in an empty ``div`` with React's `createRoot <https://react.dev/reference/react-dom/client/createRoot>`_. It uses ``React.createElement`` instead of JSX so it runs directly in the browser.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/react.rst


Move the picker or change the initial color in ``useState``. The module shares a pinned React version with its dependencies. It unmounts the React root when leaving the example document; if removing just the container in your application, call ``root.unmount()`` before removing it.

Vue: expose a component as a custom element
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Vue's `defineCustomElement <https://vuejs.org/guide/extras/web-components.html>`_ returns a constructor that can be registered with ``customElements.define()``. The following counter then uses an ordinary RST custom-element directive. Its numeric ``start`` prop is supplied by an HTML attribute.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/vue.rst


Click the counter or change ``:start: 3``. The render function uses ``h()`` without a Vue file compiler. Vue manages the custom element's mount/unmount lifecycle; a new definition requires a new document, as provided when refreshing the viewer result.

These external-library examples require an internet connection. Their modules and styles load inside each result iframe, not just in the parent documentation page.

Mathematics
-----------

The native ``math`` role and directive accept LaTeX math syntax. TP also provides ``latexmath`` as an alias and ``asciimath`` for AsciiMath. The viewer handles the shared MathJax renderer automatically. These names are available without enabling an extra extension.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/math.rst


Executing doctests
------------------

The native RST doctest syntax normally displays Python prompts and expected output. Adding the boolean ``doctest`` attribute to ``tp-restructuredtext-viewer`` executes these blocks through Python/Pyodide and shows the test results. This example has ``:doctest:`` enabled on its surrounding viewer; change an expected value to see a failed test.

.. tp-restructuredtext-viewer::
   :lite:
   :src: docs/extensions-examples/doctest.rst
   :doctest:


Browser rendering
-----------------

TP returns an embeddable HTML body fragment rather than a standalone Docutils document. Document titles and bibliographic fields are preserved, but document-head metadata does not modify the surrounding page. Filesystem includes are disabled by default; native directives that require local files need an explicitly configured runtime and available files.

For component-specific attributes and methods, see the `TP component documentation <https://tp-web-lab.github.io/tp-components/>`_. For the parser API and rendering options, see the `tp-restructuredtext repository <https://github.com/tp-web-lab/tp-restructuredtext>`_.
