import { NextResponse } from 'next/server';
import { query } from '/lib/db';

export async function GET() {
  try {
    const [rows] = await query('SELECT * FROM mahasiswa');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { id, nim, nama } = await request.json();
    await query(
      'INSERT INTO mahasiswa (ID,NIM, Nama) VALUES (?, ?, ?)',
      [id, nim, nama]
    );
    return NextResponse.json({ message: 'Berhasil ditambahkan' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    await query('DELETE FROM mahasiswa WHERE ID = ?', [id]);
    return NextResponse.json({ message: 'Berhasil dihapus' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const { id_lama, id, nim, nama } = await request.json();
    await query(
      'UPDATE mahasiswa SET ID = ?, NIM = ?, Nama = ? WHERE ID = ?',
      [id, nim, nama, id_lama]
    );
    return NextResponse.json({ message: 'Berhasil diubah' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
