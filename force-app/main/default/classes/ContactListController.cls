public with sharing class ContactListController {
    @AuraEnabled(cacheable=true)
    public static List<Contact> getContacts(Integer pageNumber, String searchTerm) {
        Integer pageSize = 10;
        Integer offset = (pageNumber - 1) * pageSize;
        String searchQuery = 'SELECT Id, Name, Email FROM Contact WHERE Name LIKE \'%' + String.escapeSingleQuotes(searchTerm) + '%\' ORDER BY Name LIMIT :pageSize OFFSET :offset';
        return Database.query(searchQuery);
    }
}
