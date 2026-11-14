---
pandoc: true
---
::: {.example #pandoc-example} ::::::
This paragraph belongs to a **Pandoc div**.

::: tp-callout {variant="info" heading="A TP custom element"}
This callout uses an explicit attribute block.

::: tp-box {}
A component with no attributes still uses `{}` in Pandoc mode.

::: {.details}
This is a nested div. Inline elements still work: :tp-icon:{name=logo-tp}
:::
::::
:::::
::::::::::

This paragraph is outside every container.
