// app/api/instituciones/route.js
import { NextResponse } from 'next/server';
import InstitucionModel from '../../../models/institucionModel';

export async function GET() {
  try {
    const instituciones = await InstitucionModel.getAll();
    return NextResponse.json(instituciones);
  } catch (error) {
    return NextResponse.json({ error: 'Error al obtener instituciones' }, { status: 500 });
  }
}