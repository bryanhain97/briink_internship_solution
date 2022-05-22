// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

export type MainIngredient = {
  [key: string]: string,
}
export type OtherIngredient = {
  [key: string]: string
}

export interface Ingredients {
  main_ingredients?: MainIngredient[],
  other_ingredients?: OtherIngredient[] 
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Ingredients>
) {
  res.status(200).json({
    main_ingredients: [
      { name: "Paprika", color: "red" },
      { name: "Aubergine", color: "purple" }
    ],
    other_ingredients: [
      { name: "Paprika", color: "red" },
      { name: "Aubergine", color: "purple" },
      { name: "Pumpkin", color: "orange" },
      { name: "Lemon", color: "yellow" },
      { name: "Spinach", color: "green" },
      { name: "Blueberries", color: "blue" }
    ]
  })
}
