// app/api/zonas/route.js
import { NextResponse } from 'next/server';
import ZonaModel from '../../../models/zonaModel';

// Petición GET: Listar todas las zonas
export async function GET() {
  try {
    const zonas = await ZonaModel.getAll();
    return NextResponse.json(zonas);
  } catch (error) {
    console.error("Error en GET /api/zonas:", error);
    return NextResponse.json({ error: 'Error al obtener las zonas' }, { status: 500 });
  }
}

// Petición DELETE: Eliminar una zona mediante el parámetro query '?id=X'
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'El ID de la zona es requerido' }, { status: 400 });
    }

    await ZonaModel.delete(id);
    return NextResponse.json({ message: 'Zona eliminada con éxito.' });
  } catch (error) {
    console.error("Error en DELETE /api/zonas:", error);
    
    // Captura del error de integridad referencial
    if (error.code === 'ER_ROW_IS_REFERENCED_2' || error.errno === 1451) {
      return NextResponse.json(
        { error: 'No se puede eliminar la zona porque existen beneficiarios registrados en esta zona geográfica.' }, 
        { status: 400 }
      );
    }
    
    return NextResponse.json({ error: 'Error al eliminar la zona' }, { status: 500 });
  }
}