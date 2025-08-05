class NumberHelper {
    yi2wan(str) {
        const num = parseFloat(str);
        return num * 10000;
    }

    guss2wan(str) {
        // 判断 str 里面是否包含 亿 这个字
        let base = 1;
        if (str.includes('亿')) {
            base = 10000;
        } else if (str.includes('万')) {
            base = 1;
        } else {
            base = 0.0001;
        }
        return parseFloat(str) * base;
    }
}

module.exports = NumberHelper;