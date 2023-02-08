class EmptyError extends Error {
    constructor(message) {
        super(message);
        this.name = 'EmptyFileError';
        this.statusCode = 400;
    }
}

module.exports = EmptyError;
