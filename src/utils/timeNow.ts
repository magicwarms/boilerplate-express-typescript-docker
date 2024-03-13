export const currentTime =
    new Date().toJSON().slice(0, 10).replace(/-/g, '/') + ' ' + new Date(Date.now()).toTimeString();
