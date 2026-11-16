import 'dotenv/config';
import { DataSource } from 'typeorm';
export default new DataSource({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/migrations/*.js'],
});
//# sourceMappingURL=data-source.js.map