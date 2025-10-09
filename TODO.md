# Pagination Implementation TODO

## 1. Update Types
- [x] Add Pagination interface to src/types/pagination.ts
- [x] Update CardListProps and TopicListProps to include pagination props

## 2. Update useCards Hook
- [x] Add pagination state: currentPage, totalPages, totalItems, pageSize
- [x] Modify fetchCardsByTopic to accept page and limit params, update API call
- [x] Modify searchCards to accept page and limit params, update API call
- [x] Return pagination info from hooks

## 3. Update useTopics Hook
- [x] Add pagination state: currentPage, totalPages, totalItems, pageSize
- [x] Modify fetchUserTopics to accept page and limit params, update API call
- [x] Return pagination info from hooks

## 4. Update CardsManager Component
- [x] Add pagination state and handlers
- [x] Add pagination UI (prev/next buttons, page info)
- [x] Handle page changes, reset page on search or topic change
- [x] Pass pagination props to CardList

## 5. Update TopicsManager Component
- [x] Add pagination state and handlers
- [x] Add pagination UI (prev/next buttons, page info)
- [x] Handle page changes, reset page on filter or search change
- [x] Pass pagination props to TopicList

## 6. Testing
- [ ] Verify pagination works for cards by topic
- [ ] Verify pagination works for card search
- [ ] Verify pagination works for topics list
- [ ] Check UI responsiveness and edge cases (no data, single page)
