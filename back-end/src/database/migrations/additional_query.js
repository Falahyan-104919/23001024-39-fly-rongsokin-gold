const additionalQuery = `
BEGIN ;
ALTER TABLE users ALTER COLUMN status SET DEFAULT TRUE;
ALTER TABLE products ALTER COLUMN status SET DEFAULT TRUE;
ALTER TABLE forum_customers ALTER COLUMN status SET DEFAULT TRUE;
ALTER TABLE forum_mitras ALTER COLUMN status SET DEFAULT TRUE;
ALTER TABLE product_type ALTER COLUMN status SET DEFAULT TRUE;
ALTER TABLE mitra_type ALTER COLUMN status SET DEFAULT TRUE;
COMMIT;
`;

const insertDataMitraType = `
    INSERT INTO mitra_type (type)
    VALUES ('Pengumpul'),('Pengelola');
`;

const insertDataProductType = `
    INSERT INTO product_type (mitra_type_id, name)
    VALUES 
    ('e468f56b-d7a5-4969-8ca6-1646e8e7980d', 'Kertas/Kardus'),
    ('e468f56b-d7a5-4969-8ca6-1646e8e7980d', 'Besi/Logam'),
    ('e468f56b-d7a5-4969-8ca6-1646e8e7980d', 'Kaca/Beling'),
    ('e468f56b-d7a5-4969-8ca6-1646e8e7980d', 'Plastik'),
    ('e468f56b-d7a5-4969-8ca6-1646e8e7980d', 'Elektronik'),
    ('e468f56b-d7a5-4969-8ca6-1646e8e7980d', 'Barang Tekstil'),
    ('e468f56b-d7a5-4969-8ca6-1646e8e7980d', 'Bahan Bangunan'),
    ('91c1715d-f238-4b74-9315-bd4d18b7a1e5', 'Bahan Kertas Daur Ulang'),
    ('91c1715d-f238-4b74-9315-bd4d18b7a1e5', 'Bahan Besi/Logam Daur Ulang'),
    ('91c1715d-f238-4b74-9315-bd4d18b7a1e5', 'Bahan Kaca/Beling Daur Ulang'),
    ('91c1715d-f238-4b74-9315-bd4d18b7a1e5', 'Bahan Plastik Daur Ulang'),
    ('91c1715d-f238-4b74-9315-bd4d18b7a1e5', 'Bahan Elektronik Daur Ulang'),
    ('91c1715d-f238-4b74-9315-bd4d18b7a1e5', 'Bahan Tekstil Daur Ulang'),
    ('91c1715d-f238-4b74-9315-bd4d18b7a1e5', 'Bahan Bangunan Daur Ulang')
`;

module.exports = {
  additionalQuery,
  insertDataMitraType,
  insertDataProductType,
};
