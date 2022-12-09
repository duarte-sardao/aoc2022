module Main where
import Data.List
import Data.Set (Set)
import qualified Data.Set as Set

getWordsFromFile :: String -> IO [String]
getWordsFromFile file = readFile file >>= return . words

main :: IO ()
main = do
  wordList <- getWordsFromFile "input.txt"
  --print((expandMoves wordList []))
  print((moveRopes (expandMoves wordList []) [] (0,0) (0,0))+1)
  
expandMoves :: [String] -> [String] -> [String]
expandMoves [] newlist = newlist
expandMoves (dir:val:movelist) newlist = expandMoves movelist (newlist ++ (replicate (read val :: Int) dir))
expandMoves _ _ = []
	
moveRopes :: [String] -> [(Int, Int)] -> (Int, Int) -> (Int, Int) -> Int
moveRopes [] tailList _ _ = length (Set.fromList tailList)
moveRopes moves tailList h t = moveRopes newmoves newlist newh newt where (newmoves, newlist, newh, newt) = doMovement((moves, tailList, h, t))
												  
doMovement :: ([String], [(Int, Int)], (Int, Int), (Int, Int)) -> ([String], [(Int, Int)], (Int, Int), (Int, Int))
doMovement ((dir:movelist), tailList, (hx, hy), (tx, ty)) = doMovementT((movelist, tailList, newh, (tx, ty))) where newh = moveX dir hx hy

moveX :: String -> Int -> Int -> (Int, Int)
moveX dir x y | dir == "R" = (x+1, y)
				  | dir == "L" = (x-1, y)
				  | dir == "U" = (x, y+1)
				  | dir == "D" = (x, y-1)

doMovementT :: ([String], [(Int, Int)], (Int, Int), (Int, Int)) -> ([String], [(Int, Int)], (Int, Int), (Int, Int)) --repeats twice for value and add but idk
doMovementT (movelist, tailList, (hx, hy), (tx, ty)) | abs diff_x > 1 || abs diff_y > 1 = (movelist, tailList ++ [(tx + signum diff_x, ty + signum diff_y)], (hx, hy), (tx + signum diff_x, ty + signum diff_y))
													 | otherwise = (movelist, tailList, (hx, hy), (tx, ty))
													 where (diff_x, diff_y) = (hx-tx, hy-ty)
													 
													 