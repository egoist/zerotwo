export default {
  name: 'StoreConsumer',
  functional: true,
  inject: ['storeInjects'],
  render(h, { data, injections }) {
    return data.scopedSlots.default(...injections.storeInjects)
  }
}
