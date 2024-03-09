const baseURL = process.env.REACT_APP_API


const urls = {
    inspectors: {
        base: '/inspectors',
        byId: (id: number): string => `${urls.inspectors.base}/${id}`
    },
    stages: {
        base: '/stages',
        byId: (id: number): string => `${urls.stages.base}/${id}`
    },
    containers: {
        base: '/containers',
        byId: (id: number): string => `${urls.containers.base}/${id}`
    }
}


export {
    baseURL,
    urls
}