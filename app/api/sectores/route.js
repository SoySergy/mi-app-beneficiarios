// app/api/sectores/route.js
import { NextResponse } from 'next/server';
import SectorModel from '../../../models/sectorModel';

// Petición GET: Listar todos los sectores
export async function GET() {
  try {
    const sectores = await SectorModel.getAll();
    return NextResponse.json(sectores);
  } catch (error) {
    console.error("Error en GET /api/sectores:", error);
    return NextResponse.json({ error: 'Error al obtener los sectores' }, { status: 500 });
  }
}

// Petición DELETE: Eliminar un sector mediante parámetro query '?id=X'
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'El ID del sector es requerido' }, { status: 400 });
    }

    await SectorModel.delete(id);
    return NextResponse.json({ message: 'Sector eliminado con éxito.' });
  } catch (error) {
    console.error("Error en DELETE /api/sectores:", error);
    
    // Captura del error de integridad referencial si existen registros vinculados
    if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451) {
      return NextResponse.json(
        { error: 'No se puede eliminar el sector debido a que existen beneficiarios registrados bajo este sector.' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: 'Error al eliminar el sector' }, { status: 500 });
  }
}