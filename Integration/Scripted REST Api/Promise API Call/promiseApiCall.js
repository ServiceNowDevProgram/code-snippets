module.exports.makeAPICalls = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        return resolve({
          status: false,
          error: error
        });
      }

      try {
        body = JSON.parse(body)
      } catch (err) {
      }
      return resolve({
        status: true,
        data: body
      });
    });
  });
};
