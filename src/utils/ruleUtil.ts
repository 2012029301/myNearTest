
export const maxLengthRule = (length: number) => {
  return {
    validator: (rule, value: string, callback) => {
      if (value && value.length > length) {
        return Promise.reject(`请输入${length}字符以内`)
      }
      return Promise.resolve()
    }
  }
}
