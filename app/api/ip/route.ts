import { NextResponse } from 'next/server'

export const GET = async (req) => {
  return NextResponse.json({
    ip2: req.ip,
    ip1: req.socket.remoteAddress,
  })
}
