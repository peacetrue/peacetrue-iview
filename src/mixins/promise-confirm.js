module.exports = {
    methods: {
        promiseConfirm(title, content) {
            return new Promise((resolve, reject) => {
                this.$Modal.confirm({
                    title: title,
                    content: content,
                    onOk: () => {
                        resolve();
                    },
                    onCancel() {
                        reject();
                    }
                });
            });
        },
    },
};

