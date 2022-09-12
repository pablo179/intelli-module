import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env') });

const getEnvVar = (value: string, required = true) => {
    const envVar = process.env[value];
    if (!envVar && required) {
        throw new Error(`Environment variable ${value} is required`);
    }
    return envVar;
}

const appConfig = {
    env: getEnvVar('NODE_ENV'),
    populationLimit: 10,
    generationLimit: 3,
    crossProbability: 0.8,
    mutationProbability: 0.01,
}

export default appConfig