// Datos de asistencia cargados automaticamente de los archivos Excel
const SEED_DATA = {
  "2026-03-02": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-03-03": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-04": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-05": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-06": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-03-09": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-10": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-03-11": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-12": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-03-13": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-03-16": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-03-17": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-18": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-19": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-20": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 8,
      "leche": 8
    }
  },
  "2026-03-23": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-24": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-03-25": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-03-26": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 8
    }
  },
  "2026-03-27": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 8
    }
  },
  "2026-04-07": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-04-08": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-04-09": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-10": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-13": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-14": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 9,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 7,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 8
    }
  },
  "2026-04-15": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-04-16": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-17": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-20": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-04-21": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 5
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 5
    }
  },
  "2026-04-22": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-23": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-04-24": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-27": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 6,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 5,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 4,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-28": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-04-29": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-04-30": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-05-01": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-05-04": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-05": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-06": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-07": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 5,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-08": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 5,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-11": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-05-12": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-05-13": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-05-14": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-05-15": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 5,
      "azucar": 5,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 5
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 6,
      "azucar": 6,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 6
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 4,
      "azucar": 4,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 4
    }
  },
  "2026-05-18": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-05-19": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-20": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-21": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-05-22": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-25": {
    "2_y_3_ciclo": {
      "aceite": 5,
      "arroz": 5,
      "azucar": 5,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 5,
      "frijol": 5,
      "leche": 0
    },
    "parvularia": {
      "aceite": 6,
      "arroz": 6,
      "azucar": 6,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 6,
      "frijol": 6,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 4,
      "arroz": 4,
      "azucar": 4,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 4,
      "frijol": 4,
      "leche": 0
    }
  },
  "2026-05-26": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-05-27": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 6,
      "arroz": 6,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 6,
      "leche": 0
    }
  },
  "2026-05-28": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-05-29": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-06-01": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-06-02": {
    "2_y_3_ciclo": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "parvularia": {
      "aceite": 11,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 8,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 8
    }
  },
  "2026-06-03": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-06-04": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 11,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 8,
      "leche": 8
    }
  },
  "2026-06-05": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 11,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 8,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-06-08": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-06-09": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-10": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-11": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-12": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-06-15": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 11
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 8
    }
  },
  "2026-06-16": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 11,
      "azucar": 11,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 11,
      "frijol": 11,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 8,
      "azucar": 8,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 8,
      "frijol": 8,
      "leche": 0
    }
  },
  "2026-06-17": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-18": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-19": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-22": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-23": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-24": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-25": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-26": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-29": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  },
  "2026-06-30": {
    "2_y_3_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "parvularia": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    },
    "primer_ciclo": {
      "aceite": 0,
      "arroz": 0,
      "azucar": 0,
      "cereal": 0,
      "cereal_vainilla": 0,
      "fortificada": 0,
      "frijol": 0,
      "leche": 0
    }
  }
};
