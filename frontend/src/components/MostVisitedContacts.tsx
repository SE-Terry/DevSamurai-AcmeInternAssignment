import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import ContactItem from './ContactItem'

const contactsData = [
  { name: 'Tham Tran', visits: 10, isCompany: false, logo: '/DevSamuraiLogo.png' },
  { name: 'DevSamurai', visits: 10, isCompany: true, logo: '/DevSamuraiLogo.png' },
  { name: 'Minh Dang', visits: 10, isCompany: false, logo: '/DevSamuraiLogo.png' },
  { name: 'Terry', visits: 9, isCompany: false },
  { name: 'Thuc Tran', visits: 10, isCompany: false, logo: '/DevSamuraiLogo.png' },
]

const mostVisitedContacts = [...contactsData].sort((a, b) => b.visits - a.visits) // Sort by visits descending (most visited first)

export function MostVisitedContacts() {
  return (
    <Card className="bg-transparent border-border" data-testid="most-visited-contacts">
      <CardHeader>
        <CardTitle className="text-card-foreground">Most visited contacts</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {mostVisitedContacts.map((contact, index) => (
            <ContactItem key={`${contact.name}-${index}`} contact={contact} />
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export default MostVisitedContacts
