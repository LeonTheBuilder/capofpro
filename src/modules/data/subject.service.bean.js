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

}

module.exports = SubjectService;