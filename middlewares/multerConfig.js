const multer = require('multer');

// Configuración de almacenamiento en memoria
const storage = multer.memoryStorage();

// Filtro para aceptar solo archivos de imagen
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Configuración de multer
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Límite de 5MB por archivo
  }
});

module.exports = upload;
