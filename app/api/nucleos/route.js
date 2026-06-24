// app/api/nucleos/route.js
import { NextResponse } from 'next/server';
import NucleoModel from '../../../models/nucleoModel';

export async function GET() {
  try {
    const nucleos = await NucleoModel.getAll();
    return NextResponse.json(nucleos);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener núcleos' }, { status: 500 });
  }
}