createEntryDatabase(query, additionalParams = null, connection = null) {
        return new Promise((resolve, reject) => {
            if (!connection) {
                connection = this.db
            }
            if (additionalParams) {
                connection.query(query, additionalParams, (err, resp) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(resp);
                })
            } else {
                connection.query(query, (err, resp) => {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(resp);
                })
            }
        })
    }
