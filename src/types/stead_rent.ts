export type SteadRent = {
  "version": "0.0.0",
  "name": "stead_rent",
  "instructions": [
    {
      "name": "initializeState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "feeEarner",
          "type": "publicKey"
        },
        {
          "name": "feeAmount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeEarner",
          "type": "publicKey"
        },
        {
          "name": "feeAmount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "initializeExhibition",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exhibitionTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "renterAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": "InitExhibitionBumpSeeds"
          }
        },
        {
          "name": "renterFee",
          "type": "u16"
        }
      ]
    },
    {
      "name": "cancelExhibition",
      "accounts": [
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "property",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renterAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeExhibition",
      "accounts": [
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitionItem",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "exhibitorAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": "ItemSeedBumps"
          }
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawToken",
      "accounts": [
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "exhibitorAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitionItem",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buyToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitionItem",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dao",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "feeEarner",
            "type": "publicKey"
          },
          {
            "name": "feeAmount",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "exhibition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "renter",
            "type": "publicKey"
          },
          {
            "name": "property",
            "type": "publicKey"
          },
          {
            "name": "renterFee",
            "type": "u16"
          },
          {
            "name": "exhibitor",
            "type": "publicKey"
          },
          {
            "name": "nPieces",
            "type": "u64"
          },
          {
            "name": "totalVolume",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": "ExhibitionStatus"
            }
          },
          {
            "name": "bumps",
            "type": {
              "defined": "InitExhibitionBumpSeeds"
            }
          }
        ]
      }
    },
    {
      "name": "exhibitionItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "exhibition",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": "ExhibitionItemStatus"
            }
          },
          {
            "name": "bumps",
            "type": {
              "defined": "ItemSeedBumps"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ItemSeedBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "item",
            "type": "u8"
          },
          {
            "name": "tokenAccount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "InitExhibitionBumpSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "exhibition",
            "type": "u8"
          },
          {
            "name": "escrow",
            "type": "u8"
          },
          {
            "name": "exhibitionToken",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "ExhibitionStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Active"
          },
          {
            "name": "Cancelled"
          }
        ]
      }
    },
    {
      "name": "ExhibitionItemStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Available"
          },
          {
            "name": "Sold"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 300,
      "name": "FeeOutOfRangeError",
      "msg": "Fee out of range"
    }
  ]
};

export const IDL: SteadRent = {
  "version": "0.0.0",
  "name": "stead_rent",
  "instructions": [
    {
      "name": "initializeState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "payer",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bump",
          "type": "u8"
        },
        {
          "name": "feeEarner",
          "type": "publicKey"
        },
        {
          "name": "feeAmount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "setState",
      "accounts": [
        {
          "name": "state",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "owner",
          "isMut": false,
          "isSigner": true
        }
      ],
      "args": [
        {
          "name": "feeEarner",
          "type": "publicKey"
        },
        {
          "name": "feeAmount",
          "type": "u16"
        }
      ]
    },
    {
      "name": "initializeExhibition",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exhibitionTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitionTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "renterAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitor",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": "InitExhibitionBumpSeeds"
          }
        },
        {
          "name": "renterFee",
          "type": "u16"
        }
      ]
    },
    {
      "name": "cancelExhibition",
      "accounts": [
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renter",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "property",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renterAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrowAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "closeExhibition",
      "accounts": [
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "depositToken",
      "accounts": [
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitionItem",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "exhibitorAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "bumps",
          "type": {
            "defined": "ItemSeedBumps"
          }
        },
        {
          "name": "price",
          "type": "u64"
        }
      ]
    },
    {
      "name": "withdrawToken",
      "accounts": [
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitor",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "exhibitorAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitionItem",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buyToken",
      "accounts": [
        {
          "name": "state",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "exhibition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitor",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "exhibitionItem",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "escrow",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "depositedTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "buyer",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "buyerAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "renter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "dao",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    }
  ],
  "accounts": [
    {
      "name": "state",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "bump",
            "type": "u8"
          },
          {
            "name": "feeEarner",
            "type": "publicKey"
          },
          {
            "name": "feeAmount",
            "type": "u16"
          }
        ]
      }
    },
    {
      "name": "exhibition",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "renter",
            "type": "publicKey"
          },
          {
            "name": "property",
            "type": "publicKey"
          },
          {
            "name": "renterFee",
            "type": "u16"
          },
          {
            "name": "exhibitor",
            "type": "publicKey"
          },
          {
            "name": "nPieces",
            "type": "u64"
          },
          {
            "name": "totalVolume",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": "ExhibitionStatus"
            }
          },
          {
            "name": "bumps",
            "type": {
              "defined": "InitExhibitionBumpSeeds"
            }
          }
        ]
      }
    },
    {
      "name": "exhibitionItem",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "exhibition",
            "type": "publicKey"
          },
          {
            "name": "mint",
            "type": "publicKey"
          },
          {
            "name": "price",
            "type": "u64"
          },
          {
            "name": "status",
            "type": {
              "defined": "ExhibitionItemStatus"
            }
          },
          {
            "name": "bumps",
            "type": {
              "defined": "ItemSeedBumps"
            }
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "ItemSeedBumps",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "item",
            "type": "u8"
          },
          {
            "name": "tokenAccount",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "InitExhibitionBumpSeeds",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "exhibition",
            "type": "u8"
          },
          {
            "name": "escrow",
            "type": "u8"
          },
          {
            "name": "exhibitionToken",
            "type": "u8"
          }
        ]
      }
    },
    {
      "name": "ExhibitionStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Active"
          },
          {
            "name": "Cancelled"
          }
        ]
      }
    },
    {
      "name": "ExhibitionItemStatus",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Available"
          },
          {
            "name": "Sold"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 300,
      "name": "FeeOutOfRangeError",
      "msg": "Fee out of range"
    }
  ]
};
