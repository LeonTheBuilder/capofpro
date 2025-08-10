class SubjectService {


    async upsertSecurityBusinessDepartment(args) {
        //
        const {
            code,
            title,
        } = args;
        //

        let securityBusinessDepartment = await this.SecurityBusinessDepartment.findOne({
            where: {
                title: title,
            }
        });
        //
        if (!securityBusinessDepartment) {
            const id = await this.idgen.next();
            securityBusinessDepartment = this.SecurityBusinessDepartment.build({id, title: title});
        }
        securityBusinessDepartment.set(args);
        await securityBusinessDepartment.save();

        return securityBusinessDepartment.id;
    }

    async upsertTrader(args) {
        const {
            id,
            title,
            type,
        } = args;
        //
        let trader = await this.Trader.findOne({
            where: {
                title: title,
            }
        });
        if (!trader) {
            const id = await this.idgen.next();
            trader = this.Trader.build({id, title: title, type: type});
        }
        trader.set(args);
        await trader.save();


        return id;
    }

}

module.exports = SubjectService;