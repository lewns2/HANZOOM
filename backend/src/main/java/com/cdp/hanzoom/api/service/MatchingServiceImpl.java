package com.cdp.hanzoom.api.service;

import com.cdp.hanzoom.api.response.MatchingFindRes;
import com.cdp.hanzoom.api.response.MatchingRes;
import com.cdp.hanzoom.api.response.UserIngredientMatchingRes;
import com.cdp.hanzoom.db.entity.Board;
import com.cdp.hanzoom.db.entity.User;
import com.cdp.hanzoom.db.repository.BoardRepositorySupport;
import com.cdp.hanzoom.db.repository.RecipeRepositorySupport;
import com.cdp.hanzoom.db.repository.UserIngredientRepositorySupport;
import com.cdp.hanzoom.db.repository.UserRepositorySupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("MatchingService")
public class MatchingServiceImpl implements MatchingService{

    @Autowired
    UserRepositorySupport userRepositorySupport;
    @Autowired
    UserIngredientRepositorySupport userIngredientRepositorySupport;
    @Autowired
    RecipeRepositorySupport recipeRepositorySupport;
    @Autowired
    BoardRepositorySupport boardRepositorySupport;

    // 모든 경우 찾기
    int ingCase[][];
    ArrayList<String> allCase;

    // 외판원 순회 문제
    int n;
    int statusFullBit;
    Double INF = Double.MAX_VALUE;
    Double map[][];
    Double dp[][];

    // 선택 매칭
    @Override
    public MatchingRes findMatchingList(String userEmail, List<String> ingredients, Double distance) {
        User user = userRepositorySupport.findUserByUserEmail(userEmail).orElse(null);
        List<UserIngredientMatchingRes> userIngredients =  userIngredientRepositorySupport.findMatchingList(user, ingredients, distance);

        int ingredientLen = ingredients.size();
        HashMap<String, Integer> matchingCount = new HashMap<String, Integer>();
        for(int i=0; i<ingredientLen; i++) matchingCount.put(ingredients.get(i),0);

        // 보내줄 대상(매칭된 결과 리스트 + 매칭할 수 없는 식재료 리스트)
        MatchingRes matchingList = new MatchingRes();
        // 매칭된 결과 리스트 담을 리스트
        List<MatchingFindRes> matchingFindRes = new ArrayList<>();

        // 식재료에 따라 매칭가능한 갯수 체크
        for(int i=0; i<userIngredients.size(); i++) {
            String temp = userIngredients.get(i).getIngredientName();
            matchingCount.put(temp, matchingCount.getOrDefault(temp, 0)+1);
            Long boardNo = userIngredients.get(i).getBoardNo();
            Board board = boardRepositorySupport.findBoardByBoardNo(boardNo).orElse(null);
            userIngredients.get(i).setImagePath(board.getImagePath());
        }

        // 매칭할 수 있는 식재료(found)와 매칭할 수 없는 식재료(notFound) 구분
        ArrayList<String> notFound = new ArrayList<String>();
        ArrayList<String> found = new ArrayList<String>();
        for(Map.Entry<String, Integer> entrySet : matchingCount.entrySet()) {
            if(entrySet.getValue() == 0) notFound.add(entrySet.getKey());
            else found.add(entrySet.getKey());
        }

        // 매칭 안된 식재료 담기
        matchingList.setNotFound(notFound);

        if(userIngredients != null) {
            int ingCnt = found.size();

            ingCase = new int[ingCnt][];
            for(int i=0; i<found.size(); i++) {
                int n = matchingCount.get(found.get(i));
                int ingCaseDetail[] = new int[n];
                int idx = 0;
                for(int j=0; j<userIngredients.size(); j++) {
                    if(userIngredients.get(j).getIngredientName().equals(found.get(i))) {
                        ingCaseDetail[idx] = j;
                        idx++;
                    }
                }
                ingCase[i] = ingCaseDetail;
            }

            // 가져온 식재료 바탕으로 가능한 경우 찾기
            allCase = new ArrayList<String>();
            ingredientCnt(0,"");

            for(int i=0; i<allCase.size(); i++) {
                String now[] = allCase.get(i).split(" ");
                map = new Double[ingCnt+1][ingCnt+1];
                for(int row=0; row<=ingCnt; row++) {
                    for(int col=0; col<=ingCnt; col++) {
                        Double lat1 = row==0? user.getLat() : userIngredients.get(Integer.parseInt(now[row])).getLat();
                        Double lng1 = row==0? user.getLng() : userIngredients.get(Integer.parseInt(now[row])).getLng();
                        Double lat2 = col==0? user.getLat() : userIngredients.get(Integer.parseInt(now[col])).getLat();
                        Double lng2 = col==0? user.getLng() : userIngredients.get(Integer.parseInt(now[col])).getLng();
                        Double X = (Math.cos(lat1)*6400*2*3.14/360) * Math.abs(lng1-lng2);
                        Double Y = 111*Math.abs(lat1-lat2);
                        map[row][col] = Math.sqrt(Math.pow(X,2)+Math.pow(Y,2));
                    }
                }

                // 외판원 순회 문제(TSP: Travelling Salesman Problem)
                n = ingCnt+1;
                statusFullBit = (1<<n) -1;
                dp = new Double[n][statusFullBit];
                for(int j=0; j<n; j++) {
                    Arrays.fill(dp[j], INF);
                }

                // 모든 식재료 돌고 돌아왔을 때 총거리
                Double total = tsp(0,1);

                // 해당 경우에 매칭된 정보들 담기
                List<UserIngredientMatchingRes> userIngredientMatchingRes = new ArrayList<>();
                for(int j=1; j<ingCnt+1; j++) {
                    userIngredientMatchingRes.add(userIngredients.get(Integer.parseInt(now[j])));
                }

                // 매칭된 식재료와 해당 경우의 총거리 담기
                MatchingFindRes matchingFind = new MatchingFindRes();
                matchingFind.setUserIngredientMatchingRes(userIngredientMatchingRes);
                matchingFind.setTotalDistance(total);

                matchingFindRes.add(matchingFind);

            }

            // matchingFindRes 전체 거리 기준으로 정렬
            Collections.sort(matchingFindRes, new Comparator<MatchingFindRes>() {
                public int compare(MatchingFindRes m1, MatchingFindRes m2) {
                    if(m1.getTotalDistance() > m2.getTotalDistance()) return 1;
                    else return -1;
                }
            });

            // 식재료 매칭된 리스트 담기
            matchingList.setMatchingList(matchingFindRes);
        }
        return matchingList;
    }

    // 레시피 추천 바탕으로 자동 매칭
    @Override
    public MatchingRes findRecipeMatchingList(String userEmail, Long recipeNo, Double distance) {
        String ingredients = recipeRepositorySupport.findRecipeByRecipeNo(recipeNo);
        ingredients = ingredients.replace("[","").replace("]","").replace("'","").replace("\\\\ufeff","");
        String[] ingredient = ingredients.substring(1,ingredients.length()-1).split(",");
        List<String> ingredientList = new ArrayList<String>();
        for(int i=0; i<ingredient.length; i++) {
            if(i%2==0) ingredientList.add(ingredient[i].replace(" ",""));
        }
        List<String> normalUserIngredients = userIngredientRepositorySupport.findNormalUserIngredientsByUserEmail(userEmail);
        for(int i=ingredientList.size()-1; i>=0; i--) {
            for(int j=0; j< normalUserIngredients.size(); j++) {
                if(ingredientList.get(i).equals(normalUserIngredients.get(j))) {
                    ingredientList.remove(i);
                    break;
                }
            }
        }
        MatchingRes matchingList = findMatchingList(userEmail, ingredientList, distance);
        return matchingList;
    }

    private void ingredientCase(int ing, int cur, String sum) {
        sum += " "+Integer.toString(ingCase[ing][cur]);
        ingredientCnt(ing+1, sum);
    }

    private void ingredientCnt(int ing, String sum) {
        if(ing==ingCase.length) {
            allCase.add(sum);
            return;
        }
        for(int i=0; i<ingCase[ing].length; i++) {
            ingredientCase(ing, i, sum);
        }
    }

    private Double tsp(int x, int check) {
        // 모든 도시 방문 완료
        if(check == statusFullBit) {
            return map[x][0];
        }

        // 메모제이션
        if(dp[x][check] != INF) return dp[x][check];

        for(int i=0; i<n; i++) {
            // next : i 도시 방문
            int next = check | (1<<i);

            // 경로가 없거나 i 도시를 이미 방문했을 경우 continue
            if((check & (1<<i)) != 0) continue;

            dp[x][check] = Math.min(dp[x][check], tsp(i, next) + map[x][i]);
        }

        return dp[x][check];
    }
}
