export const devMode = true;

export const print = (text) => {
    if (devMode && process.env.NODE_ENV != 'production') {
        console.log(text);
    };
};

export const error = (text) => {
    if (devMode && process.env.NODE_ENV != 'production') {
        console.error(text);
    };
};

export const vdata = "No Vaccination Record";

export const qrdata = `{"metadata":{"typeEn":"Government Related Organisations","typeZh":" 政府有關機構"},"nameZh":"立法會綜合大樓三樓","nameEn":"3/F, Legislative Council Complex","type":"IMPORT","hash":"4fb2eaef07855f0509f4ccbd3ffbf664d8e15987550569f25e44c4959b7d8fc1"}`;

export const version = "3.1.0";