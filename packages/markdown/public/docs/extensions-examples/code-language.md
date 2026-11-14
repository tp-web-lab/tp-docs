---
highlight:
  theme: dark
---

```javascript
// Calculate the remaining places.
const workshop = { title: "Markdown workshop", places: 12 };
function reserve(count) {
  return workshop.places - count;
}
console.log(reserve(3));
```

```css {theme=light}
/* Style the workshop heading. */
.workshop h2 {
  color: #336699;
  margin-bottom: 1rem;
}
```

```text {theme=auto}
const plainText = "This block is deliberately not colored.";
```
