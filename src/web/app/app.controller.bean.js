class AppViewController {
    index = async (ctx) => {
        await this.vr.render(ctx, __dirname, "index.ejs")
    };
    mappings = [
        ['', 'GET', this.index],
        ['/', 'GET', this.index],

    ];
}

module.exports = AppViewController;
