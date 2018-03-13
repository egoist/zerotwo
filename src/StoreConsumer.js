export default {
  name: 'StoreConsumer',

  functional: true,

  render(h, ctx) {
    return ctx.data.scopedSlots.default(ctx.parent.$store)
  }
}
