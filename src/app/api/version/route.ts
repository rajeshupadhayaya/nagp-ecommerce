export const dynamic = 'force-dynamic';

export async function GET() {
  return Response.json({ 
    version: process.env.version || 'dev',
    timestamp: new Date().toISOString()
  });
}
