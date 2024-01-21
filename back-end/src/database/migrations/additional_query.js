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
    ('06ac01ab-018d-46ef-bca6-01ef87dc3ce4', 'Kertas/Kardus'),
    ('06ac01ab-018d-46ef-bca6-01ef87dc3ce4', 'Besi/Logam'),
    ('06ac01ab-018d-46ef-bca6-01ef87dc3ce4', 'Kaca/Beling'),
    ('06ac01ab-018d-46ef-bca6-01ef87dc3ce4', 'Plastik'),
    ('06ac01ab-018d-46ef-bca6-01ef87dc3ce4', 'Elektronik'),
    ('06ac01ab-018d-46ef-bca6-01ef87dc3ce4', 'Barang Tekstil'),
    ('06ac01ab-018d-46ef-bca6-01ef87dc3ce4', 'Bahan Bangunan'),
    ('b47c79b4-23bf-436a-b621-99bba8c74879', 'Bahan Kertas Daur Ulang'),
    ('b47c79b4-23bf-436a-b621-99bba8c74879', 'Bahan Besi/Logam Daur Ulang'),
    ('b47c79b4-23bf-436a-b621-99bba8c74879', 'Bahan Kaca/Beling Daur Ulang'),
    ('b47c79b4-23bf-436a-b621-99bba8c74879', 'Bahan Plastik Daur Ulang'),
    ('b47c79b4-23bf-436a-b621-99bba8c74879', 'Bahan Elektronik Daur Ulang'),
    ('b47c79b4-23bf-436a-b621-99bba8c74879', 'Bahan Tekstil Daur Ulang'),
    ('b47c79b4-23bf-436a-b621-99bba8c74879', 'Bahan Bangunan Daur Ulang')
`;

module.exports = {
  additionalQuery,
  insertDataMitraType,
  insertDataProductType,
};
