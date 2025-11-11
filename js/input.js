document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.contact__input[autocomplete="tel"]')

  const prefix = '+998 '
  let isFocused = false

  if (!input.value) {
    input.value = ''
  }

  input.addEventListener('focus', () => {
    if (!isFocused) {
      input.value = prefix
      isFocused = true

      setTimeout(() => {
        input.setSelectionRange(input.value.length, input.value.length)
      }, 0)
    }
  })

  input.addEventListener('blur', () => {
    if (input.value === prefix) {
      input.value = ''
      isFocused = false
    }
  })

  input.addEventListener('input', () => {
    let value = input.value

    if (!value.startsWith(prefix) && isFocused) {
      const numbers = value.replace(/[^\d]/g, '')
      value = prefix + numbers
    }

    let numbers = value.slice(prefix.length).replace(/[^\d]/g, '')

    if (numbers.length > 9) {
      numbers = numbers.slice(0, 9)
    }

    let formatted = prefix
    for (let i = 0; i < numbers.length; i++) {
      if (i === 2 || i === 5 || i === 7) formatted += ' '
      formatted += numbers[i]
    }

    input.value = formatted

    setTimeout(() => {
      input.setSelectionRange(input.value.length, input.value.length)
    }, 0)
  })

  input.addEventListener('keydown', e => {
    const pos = input.selectionStart
    if (
      (e.key === 'Backspace' || e.key === 'Delete') &&
      pos <= prefix.length &&
      input.value.startsWith(prefix)
    ) {
      e.preventDefault()
    }
  })

  input.addEventListener('paste', () => {
    setTimeout(() => {
      let value = input.value
      if (!value.startsWith(prefix)) {
        const numbers = value.replace(/[^\d]/g, '').slice(0, 9)
        input.value =
          prefix +
          numbers.replace(/(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4')
      }
    }, 0)
  })
})