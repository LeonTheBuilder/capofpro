class AppUserService {

    async logout(ctx) {
        // remove t from cookies
        ctx.cookies.set('t', null);
    };


    apis = [
        ["checkToken", async (ctx) => {
            await this.ah.ctx2args(ctx, true, true);
        }],
        ["logout", async (ctx) => {
            await this.logout(ctx);
        }],
        ["issueAnonymousToken", async (ctx) => {
            const id = await this.idgen.next();
            await this.jwt.setUidJwt(ctx, id)
        }],
    ];
}


module.exports = AppUserService;