import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method Not Allowed" });
    }

    const jwt = process.env.PINATA_JWT;
    if (!jwt) {
        return res.status(500).json({ error: "Server misconfigured: missing PINATA_JWT" });
    }

    try {
        const response = await axios.post(
            "https://api.pinata.cloud/pinning/pinJSONToIPFS",
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${jwt}`,
                },
            }
        );

        return res.status(200).json(response.data);
    } catch (error: any) {
        const status = error?.response?.status || 500;
        const message = error?.response?.data || { error: "Pinning failed" };
        return res.status(status).json(message);
    }
}
