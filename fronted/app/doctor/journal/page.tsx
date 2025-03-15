import React from 'react'
import JournalTable from './table';
import JournalInput from '@/components/patient/JournalInput';

const page = () => {
  return (
    <main className="flex flex-col">
      <h1 className="font-medium text-3xl md:text-4xl">Feedback</h1>
      <p className="text-lg text-muted-foreground mb-4">Tell us your expirience?</p>

      <JournalInput/>
      <JournalTable/>
    </main>
  )
}

export default page