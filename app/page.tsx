import { redirect } from 'next/navigation'

export default function Home() {
  // Redirect to the HTML file in public folder
  redirect('/index-orig.html')
}
