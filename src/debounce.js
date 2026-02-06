/**generate a debounce utility
 * parameters function, delay
 *  */ 


export function debounce(fn, delay = 200) {
    const timerId = null;

    function debounced(...args) {
        const context = this;
        timerId = setTimeout(() => {
            fn.apply(context, args)
            timerId = null;
        }, delay)

    }
    debounced.cancel = function () {
    if (timerId) {
      clearTimeout(timerId);
      timerId = null;
    }
  };
    return debounced;
}