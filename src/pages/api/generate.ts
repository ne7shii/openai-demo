// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { openai } from '@/utils/openai'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  response: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const prompt = `I want you to act as a poet. You will create poems that evoke emotions and have the power to stir people's soul. Write on any topic or theme but make sure your words convey the feeling you are trying to express in beautiful yet meaningful ways. You can also come up with short verses that are still powerful enough to leave an imprint in readers' minds. My first request is “I need a poem about ${req.body.input}.”
`
  const resData = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: prompt,
    temperature: 0.7,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  res.status(200).json({ response: resData.data.choices[0]?.text || '' })
}
