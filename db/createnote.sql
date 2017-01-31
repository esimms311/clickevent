insert into usernotes (notes, userid)
  values($1, $2)
  returning (notes,userid)
