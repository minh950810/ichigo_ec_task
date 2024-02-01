import { config, outputFile, endpointsFiles } from '@/swagger/config'
import swaggerAutogen from 'swagger-autogen'

swaggerAutogen(outputFile, endpointsFiles, config)
