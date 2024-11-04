module.exports = (mongoose) => {
    const Card = mongoose.model(
      'cards',
      mongoose.Schema(
        {
          price: Number,
          name: String,
          mana_cost: String,
          converted_mana: Number,
        },
        { timestamps: true }
      )
    );
  
    return Card;
  };
  