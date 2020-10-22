const schema = {
  properties: {
    body: {
      type: 'string',
      minLength: 1,
      // pattern: '=s',
    },
  },
  required: ['body'],
};

export default schema;
