export const outputFile = '../swagger.json'
export const endpointsFiles = ['./routes/*.js']

export const config = {
    info: {
        title: 'eCommerce API Documentation',
        description: ''
    },
    host: process.env.HOST,
    tags: [],
    schemes: ['https', 'http']
}
