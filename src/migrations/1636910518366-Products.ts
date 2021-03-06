import { MigrationInterface, QueryRunner } from 'typeorm'

export class Products1636910518366 implements MigrationInterface {
   public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`insert into product (name, description, "unitPrice", "unitWeight") values ('F-Series Super Duty', 'Vision-oriented optimizing task-force', 70.73, 3.05);
insert into product (name, description, "unitPrice", "unitWeight") values ('9000', 'Business-focused didactic productivity', 14.72, 8.92);
insert into product (name, description, "unitPrice", "unitWeight") values ('Tribute', 'Virtual context-sensitive product', 76.26, 85.6);
insert into product (name, description, "unitPrice", "unitWeight") values ('Lancer', 'Pre-emptive multi-state instruction set', 33.65, 88.05);
insert into product (name, description, "unitPrice", "unitWeight") values ('Sienna', 'Adaptive incremental standardization', 11.93, 12.52);
insert into product (name, description, "unitPrice", "unitWeight") values ('Gran Sport', 'Cross-group bi-directional firmware', 98.14, 44.75);
insert into product (name, description, "unitPrice", "unitWeight") values ('Cooper', 'Organized national alliance', 78.96, 37.56);
insert into product (name, description, "unitPrice", "unitWeight") values ('Grand Prix', 'Upgradable encompassing architecture', 77.5, 4.71);
insert into product (name, description, "unitPrice", "unitWeight") values ('E-Class', 'Reverse-engineered impactful definition', 96.92, 25.46);
insert into product (name, description, "unitPrice", "unitWeight") values ('RX', 'Reactive zero tolerance strategy', 4.08, 91.26);
insert into product (name, description, "unitPrice", "unitWeight") values ('Previa', 'Synchronised grid-enabled system engine', 82.2, 80.28);
insert into product (name, description, "unitPrice", "unitWeight") values ('Cirrus', 'Front-line asynchronous customer loyalty', 9.88, 81.84);
insert into product (name, description, "unitPrice", "unitWeight") values ('Skylark', 'Horizontal mobile definition', 82.49, 14.45);
insert into product (name, description, "unitPrice", "unitWeight") values ('Liberty', 'Re-engineered 6th generation intranet', 85.37, 18.17);
insert into product (name, description, "unitPrice", "unitWeight") values ('1000', 'Expanded composite projection', 54.16, 41.45);
insert into product (name, description, "unitPrice", "unitWeight") values ('Sonoma Club Coupe', 'Cross-group regional projection', 16.4, 35.14);
insert into product (name, description, "unitPrice", "unitWeight") values ('Neon', 'Advanced clear-thinking emulation', 82.19, 84.61);
insert into product (name, description, "unitPrice", "unitWeight") values ( 'Escalade EXT', 'Reactive human-resource project', 38.09, 99.94);
insert into product (name, description, "unitPrice", "unitWeight") values ('80', 'Secured fault-tolerant framework', 12.84, 60.14);
insert into product (name, description, "unitPrice", "unitWeight") values ('Accent', 'Up-sized bi-directional middleware', 34.24, 58.32);
insert into product (name, description, "unitPrice", "unitWeight") values ('Jimmy', 'Focused methodical complexity', 68.1, 28.75);
insert into product (name, description, "unitPrice", "unitWeight") values ('Vantage', 'Organic multi-state matrix', 17.65, 35.03);
insert into product (name, description, "unitPrice", "unitWeight") values ('GX', 'Sharable contextually-based attitude', 17.73, 29.23);
insert into product (name, description, "unitPrice", "unitWeight") values ('Hombre', 'Managed analyzing process improvement', 41.66, 7.3);
insert into product (name, description, "unitPrice", "unitWeight") values ('Roadmaster', 'Reverse-engineered analyzing capacity', 68.76, 8.76);
insert into product (name, description, "unitPrice", "unitWeight") values ('Sentra', 'Focused tangible focus group', 92.37, 86.26);
insert into product (name, description, "unitPrice", "unitWeight") values ('Yukon XL 1500', 'Phased context-sensitive protocol', 64.74, 12.37);
insert into product (name, description, "unitPrice", "unitWeight") values ('SLR McLaren', 'Cross-platform tangible focus group', 92.19, 66.75);
insert into product (name, description, "unitPrice", "unitWeight") values ('tC', 'Programmable human-resource monitoring', 36.04, 50.12);
insert into product (name, description, "unitPrice", "unitWeight") values ('Ram Wagon B250', 'Expanded national help-desk', 24.26, 13.68);
insert into product (name, description, "unitPrice", "unitWeight") values ('Ram Wagon B350', 'Reactive intangible contingency', 16.0, 70.31);
insert into product (name, description, "unitPrice", "unitWeight") values ('F150', 'Right-sized optimal installation', 56.13, 72.46);
insert into product (name, description, "unitPrice", "unitWeight") values ('Neon', 'Integrated incremental groupware', 53.49, 45.09);
insert into product (name, description, "unitPrice", "unitWeight") values ('Grand Prix', 'Exclusive uniform matrix', 66.21, 50.87);
insert into product (name, description, "unitPrice", "unitWeight") values ('Avalanche 2500', 'De-engineered maximized hierarchy', 48.14, 74.01);
insert into product (name, description, "unitPrice", "unitWeight") values ('Explorer', 'Public-key intermediate extranet', 48.95, 50.13);
insert into product (name, description, "unitPrice", "unitWeight") values ('Tahoe', 'Multi-tiered fault-tolerant process improvement', 15.29, 55.8);
insert into product (name, description, "unitPrice", "unitWeight") values ('Grand Marquis', 'Polarised directional adapter', 15.6, 33.81);
insert into product (name, description, "unitPrice", "unitWeight") values ('Tahoe', 'Multi-lateral actuating alliance', 39.5, 85.66);
insert into product (name, description, "unitPrice", "unitWeight") values ('Miata MX-5', 'Customer-focused systematic knowledge base', 11.5, 41.72);
insert into product (name, description, "unitPrice", "unitWeight") values ('Suburban', 'Public-key bandwidth-monitored ability', 47.48, 66.07);
insert into product (name, description, "unitPrice", "unitWeight") values ('Murano', 'Re-engineered neutral pricing structure', 63.75, 6.63);
insert into product (name, description, "unitPrice", "unitWeight") values ('M-Class', 'Extended radical toolset', 42.62, 5.26);
insert into product (name, description, "unitPrice", "unitWeight") values ('Routan', 'Cross-platform 24/7 policy', 22.87, 80.11);
insert into product (name, description, "unitPrice", "unitWeight") values ('Yukon XL 2500', 'Upgradable next generation core', 24.52, 47.78);
insert into product (name, description, "unitPrice", "unitWeight") values ('Tempo', 'Pre-emptive didactic strategy', 61.22, 58.95);
insert into product (name, description, "unitPrice", "unitWeight") values ('Camaro', 'Fundamental web-enabled internet solution', 52.87, 96.53);
insert into product (name, description, "unitPrice", "unitWeight") values ('Sephia', 'Extended static installation', 58.17, 61.12);
insert into product (name, description, "unitPrice", "unitWeight") values ('Miata MX-5', 'Object-based responsive open system', 63.8, 71.12);
insert into product (name, description, "unitPrice", "unitWeight") values ('Civic', 'Digitized interactive secured line', 84.99, 70.51);
insert into product (name, description, "unitPrice", "unitWeight") values ('Bronco', 'Right-sized zero administration data-warehouse', 39.41, 43.29);
insert into product (name, description, "unitPrice", "unitWeight") values ('650', 'Switchable fresh-thinking firmware', 96.52, 55.04);
insert into product (name, description, "unitPrice", "unitWeight") values ('Santa Fe', 'Fully-configurable bandwidth-monitored model', 99.45, 1.86);
insert into product (name, description, "unitPrice", "unitWeight") values ('V70', 'Progressive discrete interface', 39.5, 33.7);
insert into product (name, description, "unitPrice", "unitWeight") values ('Commander', 'Re-engineered coherent time-frame', 8.09, 82.56);
insert into product (name, description, "unitPrice", "unitWeight") values ('Sentra', 'Integrated executive hierarchy', 75.14, 12.93);
insert into product (name, description, "unitPrice", "unitWeight") values ('GTO', 'Managed incremental initiative', 33.44, 47.76);
insert into product (name, description, "unitPrice", "unitWeight") values ('Skyhawk', 'Centralized maximized installation', 40.32, 36.37);
insert into product (name, description, "unitPrice", "unitWeight") values ('Terraza', 'Managed secondary workforce', 81.31, 27.83);
insert into product (name, description, "unitPrice", "unitWeight") values ('F150', 'Virtual tangible knowledge user', 49.15, 32.28);
insert into product (name, description, "unitPrice", "unitWeight") values ('Pathfinder', 'Reduced logistical core', 32.52, 96.96);
insert into product (name, description, "unitPrice", "unitWeight") values ('300E', 'Public-key directional capability', 20.24, 77.99);
insert into product (name, description, "unitPrice", "unitWeight") values ('S40', 'Face to face holistic functionalities', 11.65, 2.76);
insert into product (name, description, "unitPrice", "unitWeight") values ('XL-7', 'Digitized mission-critical toolset', 59.34, 69.12);
insert into product (name, description, "unitPrice", "unitWeight") values ('Tracer', 'De-engineered client-driven encoding', 79.23, 39.46);
insert into product (name, description, "unitPrice", "unitWeight") values ('Sable', 'Vision-oriented intangible leverage', 21.62, 1.81);
insert into product (name, description, "unitPrice", "unitWeight") values ('Grand Caravan', 'Function-based analyzing array', 86.51, 27.26);
insert into product (name, description, "unitPrice", "unitWeight") values ('Ram 2500', 'Reactive empowering complexity', 87.84, 40.95);
insert into product (name, description, "unitPrice", "unitWeight") values ('Monterey', 'Visionary zero defect installation', 88.37, 22.42);
insert into product (name, description, "unitPrice", "unitWeight") values ('TT', 'Managed dynamic architecture', 98.91, 66.76);
insert into product (name, description, "unitPrice", "unitWeight") values ('FJ Cruiser', 'Switchable clear-thinking application', 38.78, 36.72);
insert into product (name, description, "unitPrice", "unitWeight") values ('GX', 'Quality-focused systemic open architecture', 60.94, 46.01);
insert into product (name, description, "unitPrice", "unitWeight") values ('R-Class', 'Exclusive static functionalities', 58.18, 21.21);
insert into product (name, description, "unitPrice", "unitWeight") values ('Cherokee', 'Digitized foreground circuit', 34.78, 2.95);
insert into product (name, description, "unitPrice", "unitWeight") values ('Stratus', 'Universal hybrid monitoring', 62.59, 45.4);
insert into product (name, description, "unitPrice", "unitWeight") values ('H3', 'Stand-alone web-enabled focus group', 23.98, 90.0);
insert into product (name, description, "unitPrice", "unitWeight") values ('Camaro', 'Innovative client-server time-frame', 11.0, 54.96);
insert into product (name, description, "unitPrice", "unitWeight") values ('TSX', 'Triple-buffered motivating implementation', 54.53, 2.18);
insert into product (name, description, "unitPrice", "unitWeight") values ('Grand Prix', 'Optional upward-trending data-warehouse', 54.58, 79.5);
insert into product (name, description, "unitPrice", "unitWeight") values ('SLR McLaren', 'Team-oriented even-keeled framework', 5.43, 82.18);
insert into product (name, description, "unitPrice", "unitWeight") values ('rio', 'Sharable methodical toolset', 23.13, 96.58);
insert into product (name, description, "unitPrice", "unitWeight") values ('Grand Prix', 'Exclusive exuding application', 29.27, 6.81);
insert into product (name, description, "unitPrice", "unitWeight") values ('Yukon XL 1500', 'Automated object-oriented collaboration', 72.42, 43.03);
insert into product (name, description, "unitPrice", "unitWeight") values ('G37', 'Multi-lateral scalable intranet', 4.26, 21.92);
insert into product (name, description, "unitPrice", "unitWeight") values ('Vantage', 'Seamless mission-critical alliance', 94.21, 11.24);
insert into product (name, description, "unitPrice", "unitWeight") values ('Biturbo', 'Configurable mission-critical attitude', 80.73, 42.28);
insert into product (name, description, "unitPrice", "unitWeight") values ('Range Rover', 'Optimized 24/7 circuit', 64.73, 12.54);
insert into product (name, description, "unitPrice", "unitWeight") values ('V50', 'Integrated client-server parallelism', 66.49, 52.67);
insert into product (name, description, "unitPrice", "unitWeight") values ('Sidekick', 'Cross-group clear-thinking matrix', 26.94, 84.78);
insert into product (name, description, "unitPrice", "unitWeight") values ('Azera', 'Public-key mission-critical toolset', 76.66, 48.02);
insert into product (name, description, "unitPrice", "unitWeight") values ('F-Series', 'Switchable needs-based data-warehouse', 11.34, 39.38);
insert into product (name, description, "unitPrice", "unitWeight") values ('Azure', 'Synergized non-volatile architecture', 82.22, 65.63);
insert into product (name, description, "unitPrice", "unitWeight") values ('Z4 M Roadster', 'Configurable actuating contingency', 41.3, 64.26);
insert into product (name, description, "unitPrice", "unitWeight") values ('9-3', 'Persistent zero tolerance leverage', 2.64, 38.37);
insert into product (name, description, "unitPrice", "unitWeight") values ('Protege', 'Switchable exuding hub', 37.24, 98.3);
insert into product (name, description, "unitPrice", "unitWeight") values ('S4', 'Organic responsive hub', 18.03, 88.2);
insert into product (name, description, "unitPrice", "unitWeight") values ('A6', 'Versatile human-resource analyzer', 45.04, 11.64);
insert into product (name, description, "unitPrice", "unitWeight") values ('Accent', 'Diverse responsive data-warehouse', 43.56, 76.34);
insert into product (name, description, "unitPrice", "unitWeight") values ('G8', 'Face to face user-facing intranet', 90.45, 64.65);
insert into product (name, description, "unitPrice", "unitWeight") values ('Truck', 'Horizontal motivating installation', 52.24, 1.73);

        `)
   }

   public async down(queryRunner: QueryRunner): Promise<void> {}
}
