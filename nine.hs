module Main where
import Data.List
import Data.Set (Set)
import qualified Data.Set as Set

getWordsFromFile :: String -> IO [String]
getWordsFromFile file = readFile file >>= return . words

replace pos newVal list = take pos list ++ newVal : drop (pos+1) list

expandMoves :: [String] -> [String] -> [String]
expandMoves [] newlist = newlist
expandMoves (dir:val:movelist) newlist = expandMoves movelist (newlist ++ (replicate (read val :: Int) dir))
expandMoves _ _ = []

main :: IO ()
main = do
  wordList <- getWordsFromFile "input.txt"
  print(moveRopes (expandMoves wordList []) [] (replicate 2 (0,0)))
  print(moveRopes (expandMoves wordList []) [] (replicate 10 (0,0)))
	
moveRopes :: [String] -> [(Int, Int)] -> [(Int, Int)] -> Int
moveRopes [] tailList _ = length (Set.fromList tailList)
moveRopes (dir:movelist) tailList ((hx,hy):lst) = moveRopes newmoves newlist newt
                                                where newhts = [(moveX dir hx hy)] ++ lst
                                                      (newmoves, newlist, newt) = doMovementT((movelist, tailList, newhts, 1))


doMovementT :: ([String], [(Int, Int)], [(Int, Int)], Int) -> ([String], [(Int, Int)], [(Int, Int)])
doMovementT (movelist, tailList, ys, pos) | pos == (length ys) - 1  = (movelist, tailList ++ [newY], replace pos newY ys)
										  | otherwise = doMovementT(movelist, tailList, replace pos newY ys, pos+1)
										  where newY = updateY (ys !! (pos-1)) (ys !! pos)
													 
updateY :: (Int, Int) -> (Int, Int) -> (Int, Int)
updateY (hx, hy) (tx, ty) | abs diff_x > 1 || abs diff_y > 1 = (tx + signum diff_x, ty + signum diff_y)
						  | otherwise = (tx, ty)
					      where (diff_x, diff_y) = (hx-tx, hy-ty)


moveX :: String -> Int -> Int -> (Int, Int)
moveX dir x y | dir == "R" = (x+1, y)
		      | dir == "L" = (x-1, y)
		      | dir == "U" = (x, y+1)
		      | dir == "D" = (x, y-1)